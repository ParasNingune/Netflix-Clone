import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import BackgroundImg from '../components/BackgroundImg';
import Header from "../components/Header";
import "../styles/signup.css"
import {firebaseAuth} from "../utils/firebase"
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { Navigate, useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const handleSignIn = async ()=>{
        try{
            const {email, password} = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        }
        catch(err){
            console.log(err);
        }
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) navigate("/");
    })
  return (
    <Container className='signup-container' showPassword={showPassword}>
        <BackgroundImg />
        <div className='signup-content'>
            <Header login/>
                <div className='signup-main-body'>
                    <div className='signup-text-body'>
                        <h1 className='h1'>Unlimited movies, TV shows and more</h1>
                        <h4 className='h4'>Watch anywhere. Cancel anytime.</h4>
                        <h6 className='h6'>Ready to watch? Enter your email to create or restart your membership.</h6>
                    </div>

                    <div className='signup-get-info'>
                        <input type='email' 
                            className='email-input'
                            placeholder='Email address' 
                            name='email' 
                            value={formValues.email} 
                            onChange={(e) => 
                                setFormValues({...formValues,[e.target.name] : e.target.value,
                                })
                            }
                        />
                        {
                            showPassword && (
                                <input type='password' 
                                className='password-input'
                                placeholder='Password' 
                                name='password' 
                                value={formValues.password} 
                                onChange={(e) => 
                                    setFormValues({...formValues,[e.target.name] : e.target.value,
                                    })
                                }
                            />
                        )}
                        {!showPassword && (
                            <button className='get-started-button' onClick={() => setShowPassword(true)}> Password  </button>
                        )}
                    </div>
                    <button className='sign-in-button' onClick={handleSignIn}>Sign In</button>
                </div>
        </div>
    </Container>
  );
};
const Container = styled.div`
    .signup-get-info{
        grid-template-columns: ${({ showPassword }) =>
         showPassword ? "1fr 1fr" : "2fr 1fr"};
    }
`;
export default Signup;
