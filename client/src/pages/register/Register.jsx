import React from 'react';
import "./register.css";
import Logo from "../../image/logo.webp";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/login");
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
                    <h1>Sign Up</h1>
                    <div>
                        <input 
                            placeholder='First Name' 
                            className='infoInput' 
                            name='firstname'
                        />
                        <input 
                            placeholder='Last Name' 
                            className='infoInput' 
                            name='lastname'
                        />
                    </div>
                    <div>
                        <input 
                            className='infoInput'
                            placeholder='username'
                            name='username'
                        />
                    </div>
                    <div>
                        <input 
                            className='infoInput' 
                            placeholder='password' 
                            name='password'
                        />
                        <input 
                            className='infoInput' 
                            placeholder='confirm password' 
                            name='pconfirmPass'
                        />
                    </div>
                    <div>
                        <span className='spanForm' onClick={handleClick}>Already have an account? Login!</span>
                    </div>
                    <button className='button infoButton' type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register

