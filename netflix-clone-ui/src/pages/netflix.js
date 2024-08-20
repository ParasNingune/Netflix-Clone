import React, {useEffect, useState} from 'react';
import {NavBar} from "../components/navBar"
import "../styles/netflix.css"
import "../assets/home.jpg"
import backGroundImage from "../assets/home.jpg";
import movieLogo from "../assets/homeTitle.webp";
import {FaPlay} from "react-icons/fa";
import {AiOutlineInfoCircle} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { getGenres, fetchMovies} from '../store';
import  Slider from "../components/slider";

function Netflix() {

  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netflix.movies);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if(genresLoaded) dispatch(fetchMovies({type:"all"}));
  }, [genresLoaded]);

  window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false:true);
      return () => (window.onscroll = null);
  };

  return (
    <div className='main'>
      <NavBar isScrolled={isScrolled}/>

      <div className='hero'>
        <img 
          src={backGroundImage}
          alt='background'
          className='background-image'
        />
      </div>

      <div className='container'>

        <div className='logo-info'>
          <img className='image' src={movieLogo} alt='Movie logo' />
        </div>

        <div className='buttons'>
          <button className='play' onClick={() => navigate('/player')}>
            <FaPlay /> Play
          </button>
          <button className='outline'>
            <AiOutlineInfoCircle /> More info
          </button>
        </div>
      </div>
      <Slider movies={movies}/>
    </div>
  );
}

export default Netflix;