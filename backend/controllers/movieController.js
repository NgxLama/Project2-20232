import Fuse from 'fuse.js';
import db from '../firebase.js';
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
    const q = query(collection(db, "seats"), where("room_id", "==", req.params.id));
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
    const showtimeDoc = await getDoc(doc(db, "showtimes", orderDoc.data().showtime_id));
    const roomDoc = await getDoc(doc(db, "rooms", showtimeDoc.data().room_id));
    const movieDoc = await getDoc(doc(db, "movies", showtimeDoc.data().movie_id));
    let seats = [];
    await Promise.all(orderDoc.data().seats.map(async (seat) => {
        let tmp = await getDoc(doc(db, "seats", seat));
        seats.push(tmp.data());
    }));
    res.status(200).json({
        amount: orderDoc.data().amount,
        showtime: showtimeDoc.data(),
        movie: movieDoc.data(),
        room: roomDoc.data(),
        seats
    });
}