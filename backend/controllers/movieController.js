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
  Timestamp
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
        seats.push(seat.data());
    });
    res.status(200).json({ seats });
}