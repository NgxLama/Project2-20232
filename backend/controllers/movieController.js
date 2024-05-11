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