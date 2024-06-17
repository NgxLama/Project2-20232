import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllMovies from "./pages/AllMovies";
import AddMovieForm from "./pages/AddMovie";
import UpdateMovie from "./pages/UpdateMovie";
import MoviePage from "./pages/MoviePage";
import Showtimes from "./pages/Showtimes";
import Test from "./pages/Test";
import Rooms from "./pages/Rooms";
import Order from "./pages/Order";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import User from "./pages/User";
import ProtectedRoute from "./ProtectedRoute";
import Report from "./pages/Report";

function App() {

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><AllMovies /></ProtectedRoute>} />
          <Route path="/movie" element={<ProtectedRoute><AllMovies /></ProtectedRoute>} />
          <Route path="/movie/:id" element={<ProtectedRoute><MoviePage /></ProtectedRoute>} />
          <Route path="/movie/addMovie" element={<ProtectedRoute><AddMovieForm /></ProtectedRoute>} />
          <Route path="/movie/updateMovie/:id" element={<ProtectedRoute><UpdateMovie /></ProtectedRoute>} />
          <Route path="/showtimes" element={<ProtectedRoute><Showtimes /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
