import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getUsersLikedMovies } from '../store';
import {firebaseAuth} from "../utils/firebase"
import {onAuthStateChanged} from "firebase/auth";
import { NavBar } from '../components/navBar';
import "../styles/userLiked.css";
import Card from '../components/card';

export default function UserLiked() {

    const movies = useSelector((state) => state.netflix.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(false);

    onAuthStateChanged(firebaseAuth, (currentUser) =>{
        if(currentUser) setEmail(currentUser.email);
        else navigate("/login");
    });

    useEffect(() => {
        if(email) {
            dispatch(getUsersLikedMovies(email));
        }
    }, [email]);


    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false:true);
    return () => (window.onscroll = null);
    };
    
    return (
        <div className='liked-container'>
            <NavBar isScrolled={isScrolled} />
            
            <div className='content'>
                <h1 className='heading'>My List</h1>
                
                <div className='grid'>
                    {
                        movies.map((movie, index) => {
                            return (
                                <Card
                                    movieData={movie}
                                    index={index}
                                    key={movie.id}
                                    isLiked={true}
                                />
                            );
                        })}
                    </div>
            </div>
        </div>
      );
}
