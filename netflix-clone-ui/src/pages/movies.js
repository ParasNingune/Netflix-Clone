import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import {firebaseAuth} from "../utils/firebase"
import {onAuthStateChanged} from "firebase/auth";
import { NavBar } from '../components/navBar';
import Slider from '../components/slider';
import NotAvailable from '../components/notAvailable';
import "../styles/movies.css";
import SelectGenre from '../components/selectGenre';

export default function Movies() {

    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);

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

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        // if(currentUser) navigate("/");
    })

return (
    <div className='movies-container'>
        <div className='navbar'>
            <NavBar isScrolled={isScrolled} />
        </div>
        
        <div className='data'>
            <SelectGenre genres={genres} type="movie"/>
            {
                movies.length ? <Slider movies={movies} /> :<NotAvailable />
            }
        </div>
    </div>
  )
}
