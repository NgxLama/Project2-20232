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