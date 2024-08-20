import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {IoPlayCircleSharp} from "react-icons/io5";
import {RiThumbUpFill, RiThumbDownFill} from "react-icons/ri";
import {BsCheck} from "react-icons/bs";
import {AiOutlinePlus} from "react-icons/ai";
import {BiChevronDown} from "react-icons/bi";
import "../styles/card.css"
import {firebaseAuth} from "../utils/firebase";
import axios from "axios";
import {onAuthStateChanged} from "firebase/auth";
import {useDispatch} from "react-redux"
import video from "../assets/video.mp4";
import { removeMovieFromLiked } from '../store';



function Card({index, movieData, isLiked=false}) {
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState(false);
    const navigate = useNavigate();

    onAuthStateChanged(firebaseAuth, (currentUser) =>{
        if(currentUser) setEmail(currentUser.email);
        else navigate("/login");
    });

    const addToList = async () => {
        try {
            await axios.post("http://localhost:8000/api/user/add", {email, data: movieData});
        } catch(error) {
            console.log(error);
        }
    };
    const dispatch = useDispatch();

  return (
    <div className='card-container'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} 
                alt='movie' 
        /> 
        {
            isHovered && (
                <div className='hover'>
                    <div className='image-video-container'>
                        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                             alt='movie'
                             onClick={() => navigate("/player")}
                        />

                        <video src={video} autoPlay muted loop onClick={() => navigate("/player")}/>
                    </div>
                    <div className='info-container'>
                        <h3 className='name' onClick={() => navigate("/player")}>
                            {movieData.name}
                        </h3>
                        <div className='icons'>
                            <div className='controls'>
                                <IoPlayCircleSharp title='Play' onClick={()=> navigate("/player")}/>
                                <RiThumbUpFill title='Like' />
                                <RiThumbDownFill title='Dislike' />
                                {isLiked ? (
                                    <BsCheck title='Remove From List' onClick={() => dispatch(removeMovieFromLiked({movieId:movieData.id, email}))}/>
                                ) : (
                                    <AiOutlinePlus title='Add to my List' onClick={addToList}/>
                                )}
                            </div>
                            <div className='info'>
                                <BiChevronDown title='More Info' />
                            </div>
                        </div>
                        <div className='genres'>
                            <ul className='list'>
                                {movieData.genres.map((genre) => (
                                    <li key={genre}>{genre}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}


export default Card