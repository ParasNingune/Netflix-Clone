import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import "../styles/navBar.css";
import logo from "../assets/logo.png";
import styled from "styled-components";

import {FaSearch, FaPowerOff} from "react-icons/fa";
import {onAuthStateChanged, signOut} from "firebase/auth"
import {firebaseAuth} from "../utils/firebase"

export function NavBar({isScrolled}) {
    const links = [
        {name: "Home", link: "/"},
        {name: "TV Shows", link: "/tv"},
        {name: "Movies", link: "/movies"},
        {name: "My List", link: "/mylist"},
    ];

    const navigate = useNavigate();
    
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(!currentUser) navigate("/login");
    });

    const [showShearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);

  return (
    <Container >
        <nav className={`flex ${isScrolled ? "scrolled" : ""}`} >
            <div className='left'>
                <div className='branding'>
                    <img className="logo" src={logo} alt='logo' />
                </div>
                <ul className='links'>
                    {links.map(({name, link}) => {
                        return (
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className='right'>
                <div className={`search ${showShearch ? "show-search": ""}`}>
                    <button onFocus={() => setShowSearch(true)} onBlur={
                        () => {
                            if(!inputHover) setShowSearch(false);
                        }
                    }>
                        <FaSearch />
                    </button>

                    <input 
                        type='text' 
                        placeholder='Search'
                        onMouseEnter={() => {setInputHover(true)}}
                        onMouseLeave={() => {setInputHover(false)}}
                        onBlur={() => {
                            setInputHover(false);
                            setShowSearch(false);
                            }}
                    />
                </div>
                <button onClick={() => {signOut(firebaseAuth)}}>
                    <FaPowerOff />
                </button>
            </div>
        </nav>
    </Container>
  );
}

const Container = styled.div``;