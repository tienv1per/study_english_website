import React from 'react';
import "../register/register.css";
import Logo from "../../image/logo.webp";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/register");
    }

    const navToHome = (e) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <div className='Auth'>
            <div className='a-left'>
                <img src={Logo} alt=''/>
                <div className='Webname'>
                    <h1>ELSA Speak</h1>
                    <h4>Your personal AI-powered English speaking coach</h4>
                </div>
            </div>
            <div className='a-right'>
                <form className='infoForm authForm'>
                    <h2>Log In</h2>
                    <div>
                        <input
                            placeholder='username'
                            className='infoInput'
                            name='username'
                        />
                    </div>
                    <div>
                        <input
                            placeholder='password'
                            className='infoInput'
                            name='password'
                        />
                    </div>
                    <div style={{marginTop: "25px"}}>
                        <span className='spanForm' onClick={handleClick}>Don't have an account? Sign Up</span>
                        <button className='button infoButton' onClick={navToHome}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login