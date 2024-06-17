import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from './components/NavBar';
import SidebarComponent from './components/SideBar';
import Home from "./pages/Home";
import AllMovies from "./pages/AllMovies";
import AddMovieForm from "./pages/AddMovie";
import UpdateMovie from "./pages/UpdateMovie";
import MoviePage from "./pages/MoviePage";
import Showtimes from "./pages/Showtimes";
import Test from "./pages/Test";
import Room from "./pages/Room";
import Order from "./pages/Order";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import User from "./pages/User";

function App() {
  // Determine if Sidebar and Navbar should be rendered based on current route
  const shouldRenderSidebarAndNavbar = () => {
    const path = window.location.pathname;
    // List paths where Sidebar and Navbar should not be rendered
    const pathsWithoutSidebarAndNavbar = ['/login', '/sign-up'];

    return !pathsWithoutSidebarAndNavbar.includes(path);
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
          <Routes>
            <Route path="/sign-up" element={<SignUp />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route path="/" element={<Home />} />
            <Route path="/movie" element={<AllMovies />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/movie/addMovie" element={<AddMovieForm />} />
            <Route path="/movie/updateMovie/:id" element={<UpdateMovie />} />
            <Route path="/showtimes" element={<Showtimes />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/room" element={<Room />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/user" element={<User />} /> 
            <Route path="/test" element={<Test />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
