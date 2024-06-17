import Fuse from 'fuse.js';
import db from '../firebase.js';
import dbadmin from '../firebase-admin.js';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Movie from '../models/movieModel.js'

// GET /getMovieById/:id
export const getMovieById = async (req, res) => {
    const movieDoc = await getDoc(doc(db, "movies", req.params.id));
    let movie = movieDoc.data();
    movie.showtimes = [];

    const q = query(collection(db, "showtimes"), where("movie_id", "==", req.params.id));
    const showtimeDocs = await getDocs(q);

    // Tạo một mảng các promise từ các yêu cầu dữ liệu
    const showtimePromises = showtimeDocs.docs.map(async (showtime) => {
        let tmp = showtime.data();
        tmp.id = showtime.id;
        const roomDoc = await getDoc(doc(db, "rooms", tmp.room_id));
        for (let key in roomDoc.data()) {
            tmp[key] = roomDoc.data()[key];
        }
        return tmp;
    });

    // Đợi cho tất cả các promise hoàn thành
    const showtimes = await Promise.all(showtimePromises);

    movie.showtimes = showtimes;

    res.status(200).json({ movie });
}

// GET /getAllMovie
export const getAllMovie = async (req, res) => {
    let movies = [];
    const movieDocs = await getDocs(collection(db, "movies"))
    movieDocs.forEach((movie) => {
        let tmp = {};
        for (let key in movie.data()) {
            tmp[key] = movie.data()[key];
        }
        tmp.id = movie.id;
        movies.push(tmp);
    })

    if (movieDocs.empty) {
        res.status(402).json({
            message: "Chưa có phim!"
        })
    }

    res.status(200).json({
        movies
    })
}

// GET /findMovie?search=...
export const findMovie = async (req, res) => {
    // tạo dữ liệu cho việc tìm kiếm
    let movies = [];
    const options = {
        keys: ['title', 'actors', 'director'],
        threshold: 0.5
    };
    // lấy dữ liệu từ database
    const movieDocs = await getDocs(collection(db, "movies"));
    movieDocs.forEach((movie) => {
        movies.push(new Movie(movie));
    });
    const fuse = new Fuse(movies, options);
    let result = fuse.search(req.query.search);
    result = result.map((obj) => obj.item);

    res.status(200).json({
        movies: result
    });
}

// GET /getAllSeatsOfRoom
export const getAllSeatsOfRoom = async (req, res) => {
    const showtime_id = req.query.showtime_id;
    const q = query(collection(db, "seats"), where("room_id", "==", req.params.id),where('showtime_id', '==', showtime_id));
    const seatDocs = await getDocs(q);
    let seats = [];
    seatDocs.forEach((seat) => {
        let tmp = seat.data();
        tmp.id = seat.id;
        seats.push(tmp);
    });
    res.status(200).json({ seats });
}

// POST /savePayment
export const savePayment = async (req, res) => {
    const orderDoc = await addDoc(collection(db, "orders"), {
        showtime_id: req.body.showtime_id,
        seats: req.body.seats,
        amount: req.body.amount,
        user_id: req.body.user_id,
        status: req.body.status
    })
    res.status(200).json({
        status: true,
        id: orderDoc.id
    });
}

// POST /updatePayment/:id
export const updatePayment = async (req, res) => {
    const orderDoc = await getDoc(doc(db, "orders", req.params.id));
    await updateDoc(orderDoc.ref, {
        status: true
    })
    orderDoc.data().seats.forEach(async (seat) => {
        await updateDoc(doc(db, "seats", seat), {
            status: true
        })
    })
    res.status(200).json({
        status: true
    });
}

// GET /getOrderById/:id
export const getOrderById = async (req, res) => {
    const orderDoc = await getDoc(doc(db, "orders", req.params.id));
    if (!orderDoc.exists()) {
        res.status(200).json({
            status: true
        })
    }
    else {
        const showtimeDoc = await getDoc(doc(db, "showtimes", orderDoc.data().showtime_id));
        const roomDoc = await getDoc(doc(db, "rooms", showtimeDoc.data().room_id));
        const movieDoc = await getDoc(doc(db, "movies", showtimeDoc.data().movie_id));
        let seats = [];
        await Promise.all(orderDoc.data().seats.map(async (seat) => {
            let tmp = await getDoc(doc(db, "seats", seat));
            seats.push(tmp.data());
        }));
        res.status(200).json({
            id: orderDoc.id,
            user_id: orderDoc.data().user_id,
            amount: orderDoc.data().amount,
            showtime: showtimeDoc.data(),
            movie: movieDoc.data(),
            room: roomDoc.data(),
            seats
        });
    }
}

// GET /getAllOrdersOfUser/:id
export const getAllOrdersOfUser = async (req, res) => {
    const q = query(collection(db, "orders"), where("user_id", "==", req.params.id), where("status", "==", true));
    const orderDocs = await getDocs(q);
    let orders = [];
    if (!orderDocs.empty) {
        orderDocs.forEach((orderDoc) => {
            orders.push(orderDoc.id);
        })
    }
    res.status(200).json({
        orders
    })
}

// GET //getAllOrder
export const getAllOrders = async (req, res) => {
    const q = query(collection(db, "orders"), where("status", "==", true));
    const orderDocs = await getDocs(q);
    let orders = [];
    if (!orderDocs.empty) {
        orderDocs.forEach((orderDoc) => {
            orders.push(orderDoc.id);
        })
    }
    res.status(200).json({
        orders
    })
}

// POST /deleteOrderById/:id
export const deleteOrderById = async (req, res) => {
    const orderId = req.params.id;
    const orderDocRef = doc(db, "orders", orderId);

    try {
        // Retrieve the order document to get the seat IDs
        const orderDoc = await getDoc(orderDocRef);
        if (!orderDoc.exists()) {
            return res.status(404).json({
                status: false,
                message: "Order not found"
            });
        }

        const orderData = orderDoc.data();
        const seatIds = orderData.seats || []; // Assuming seats is an array field in the order document

        // Update the status field in each seat document
        const updatePromises = seatIds.map(seatId => {
            const seatDocRef = doc(db, "seats", seatId);
            return updateDoc(seatDocRef, { status: false }); // Change 'available' to whatever status you need
        });

        // Wait for all seat status updates to complete
        await Promise.all(updatePromises);

        // Delete the order document
        await deleteDoc(orderDocRef);

        // Send a successful response
        res.status(200).json({
            status: true
        });
    } catch (error) {
        console.error("Error deleting order and updating seats:", error);
        res.status(400).json({
            status: false,
            error: error.message
        });
    }
}


//POST /addMovie
export const addMovie= async (req,res) => {
    try {
        const storage = getStorage();
        const { actors, description, director, duration, genre, release_date, title, trailer } = req.body;
        const file = req.file;
    
        // Upload poster image to Firebase Storage
        const storageRef = ref(storage, `posters/${Date.now()}_${file.originalname}`);
        const snapshot = await uploadBytes(storageRef, file.buffer);
        const poster = await getDownloadURL(snapshot.ref);
    
        // Add movie details to Firestore
        const docRef = await addDoc(collection(db, 'movies'), {
          actors,
          description,
          director,
          duration,
          genre,
          release_date,
          title,
          trailer,
          poster,
        });
    
        res.status(201).json({ message: 'Movie added successfully', id: docRef.id });
      } catch (error) {
        console.error('Error adding document: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
}

//PUT /updateMovieById/:id
export const updateMovieById= async (req,res) => {
    try {
        const { id } = req.params;
        const storage = getStorage();
        const { actors, description, director, duration, genre, release_date, title, trailer, poster } = req.body;
        let posterUrl = poster;
        const file = req.file;
        if (file) {
            // Upload poster image to Firebase Storage
            const storageRef = ref(storage, `posters/${Date.now()}_${file.originalname}`);
            const snapshot = await uploadBytes(storageRef, file.buffer);
            posterUrl = await getDownloadURL(snapshot.ref);
        }

        const movieRef = doc(db, "movies", id);
        await updateDoc(movieRef, {
            actors,
            description,
            director,
            duration,
            genre,
            release_date,
            title,
            trailer,
            poster: posterUrl
        });

        res.status(201).json({ message: 'Movie updated successfully', id: movieRef.id });
    } catch (error) {
        console.error('Error adding document: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

// DELETE /deleteMovieById/:id
export const deleteMovieById = async (req, res) => {
    deleteDoc(doc(db, "movies", req.params.id))
        .then(() => {
            res.status(200).json({
                status: true
            });
        })
        .catch((error) => {
            res.status(400).json({
                status: false
            });
        });
  }

//GET //allRooms
export const getAllRooms = async (req, res) => {
    try {
        const roomsSnapshot = await getDocs(collection(db, 'rooms'));;
        const rooms = [];
        roomsSnapshot.forEach(doc => {
          rooms.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(rooms);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
        res.status(500).send('Internal Server Error');
      }
  }

  //POST //addShowtime
  export const addShowtime = async (req, res) => {
    try {
        const { room_id, start_time, movie_id, end_time } = req.body;

        // Validate the input
        if (!room_id || !start_time || !movie_id || !end_time) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        // Convert start and end times to Date objects for comparison
        const startTime = new Date(start_time);
        const endTime = new Date(end_time);

        const conflictingShowtimesSnapshot = await dbadmin.collection('showtimes')
            .where('room_id', '==', room_id)
            .where('start_time', '<=', end_time)
            .where('end_time', '>=', start_time)
            .get();

        if (!conflictingShowtimesSnapshot.empty) {
            res.status(409).json({ error: 'Conflicting showtime exists in the same room and time range.' });
            return;
        }

        // Add a new document to the 'showtimes' collection
        const showtimeData = {
            room_id,
            start_time: startTime,
            movie_id,
            end_time: endTime,
        };

        const showtimeRef = await dbadmin.collection('showtimes').add(req.body);

        // Fetch the 'layout' subcollection from the specified room document
        const roomDocumentRef = dbadmin.collection('rooms').doc(room_id);
        const layoutCollectionRef = roomDocumentRef.collection('layout');
        const layoutSnapshot = await layoutCollectionRef.get();

        if (layoutSnapshot.empty) {
            console.log('No layout documents found.');
            res.status(404).json({ error: 'No layout documents found.' });
            return;
        }

        const layoutData = [];
        const seatsPromises = [];

        layoutSnapshot.forEach(doc => {
            const layoutDoc = doc.data();
            layoutData.push({
                id: doc.id,
                data: layoutDoc
            });

            // Create new seat document for each layout document
            const seatData = {
                price: layoutDoc.price,
                seat_number: layoutDoc.seat_number,
                seat_type: layoutDoc.seat_type,
                showtime_id: showtimeRef.id,
                status: false,
                room_id: room_id
            };

            // Add the new seat to the 'seats' collection
            seatsPromises.push(dbadmin.collection('seats').add(seatData));
        });

        // Wait for all seat documents to be added
        await Promise.all(seatsPromises);

        // Respond with the ID of the created showtime document and the layout data
        res.status(201).json({ showtimeId: showtimeRef.id, layout: layoutData });
    } catch (error) {
        console.error('Error adding showtime or fetching layout:', error);
        res.status(500).json({ error: 'Error adding showtime or fetching layout' });
    }
  }

  //GET //getAllShowtimes
  export const getAllShowtimes = async (req, res) => {
    try {
        const showtimesCollection = collection(db, 'showtimes');
        const showtimesQuery = query(showtimesCollection, orderBy('start_time','desc'));
        const showtimesSnapshot = await getDocs(showtimesQuery);
        const showtimesList = showtimesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(showtimesList);
    } catch (error) {
        console.error('Error fetching showtimes:', error);
        res.status(500).json({ error: 'Failed to fetch showtimes' });
    }
  }

  // DELETE /deleteShowtimeById/:id
export const deleteShowtimeById = async (req, res) => {
    const showtimeId = req.params.id;

    try {
      // Start a batch
      const batch = dbadmin.batch();
  
      // Reference to the showtime document
      const showtimeRef = dbadmin.collection('showtimes').doc(showtimeId);
      
      // Delete the showtime document
      batch.delete(showtimeRef);
  
      // Query for all seats with the given showtime_id
      const seatsQuerySnapshot = await dbadmin.collection('seats').where('showtime_id', '==', showtimeId).get();
  
      // Delete each seat document in the query result
      seatsQuerySnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
  
      // Query for all orders with the given showtime_id
      const ordersQuerySnapshot = await dbadmin.collection('orders').where('showtime_id', '==', showtimeId).get();
  
      // Delete each order document in the query result
      ordersQuerySnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
  
      // Commit the batch
      await batch.commit();
  
      res.status(200).send({ message: 'Showtime, associated seats, and orders deleted successfully' });
    } catch (error) {
      console.error('Error deleting showtime, seats, and orders:', error);
      res.status(500).send({ message: 'Failed to delete showtime, associated seats, and orders', error });
    }  
  }

// PUT /updateShowtimeById/:id
export const updateShowtimeById = async (req, res) => {
    const { id } = req.params;
    const { room_id, start_time, movie_id, end_time } = req.body;
    try {
        const showtimeDoc = doc(db, 'showtimes', id);
        await updateDoc(showtimeDoc, { room_id, start_time, movie_id, end_time });
        res.status(200).json({ message: 'Showtime updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update showtime' });
    }

  }

  // GET /getLayoutById/:id
  export const getLayoutById = async (req, res) => {
    try {
        const {id} = req.params;
        const roomsCollection = dbadmin.collection('rooms');
        const roomDocumentRef = roomsCollection.doc(id); 
        const layoutCollectionRef = roomDocumentRef.collection('layout');

        const layoutSnapshot = await layoutCollectionRef.get();

        if (layoutSnapshot.empty) {
            console.log('No layout documents found.');
            res.status(404).json({ error: 'No layout documents found.' });
            return;
        }

        const layoutData = [];
        layoutSnapshot.forEach(doc => {
            layoutData.push({
                id: doc.id,
                data: doc.data()
            });
        });

        res.status(200).json(layoutData); 
    } catch (error) {
        console.error('Error fetching layout documents:', error);
        res.status(500).json({ error: 'Error fetching layout documents.' });
    }
  }