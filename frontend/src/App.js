import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Profile from "./Profile";
import Movies from "./components/AllMovies"
import FindMovie from "./components/FindMovie"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./PrivateRoute"
import Home from "./Home/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />}/>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/findMovie" element={<FindMovie />}/>
        // Redirect to login page if user is not logged in
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer hideProgressBar />
    </BrowserRouter>
  );
}

export default App;
