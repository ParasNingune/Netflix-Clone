import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './pages/login'
import Movies from './pages/movies'
import Netflix from './pages/netflix'
import Player from './pages/player'
import Signup from './pages/signup'
import TvShows from './pages/TvShows'
import UserLiked from './pages/userLiked'

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Netflix />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/player" element={<Player />} />
            <Route exact path="/tv" element={<TvShows />} />
            <Route exact path="/movies" element={<Movies />} />
            <Route exact path="/new" element={<Player />} />
            <Route exact path="/mylist" element={<UserLiked />} />
        </Routes>
      </BrowserRouter>
    );
  }