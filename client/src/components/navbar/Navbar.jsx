import React from 'react'
import "./navbar.css";
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';

const Navbar = () => {
    const navigate = useNavigate();
    const navToLogin = async(e) => {
        e.preventDefault();
        await Api.authApi.logoutApi;
        navigate("/login");
    }

    const navToRegister = (e) => {
        e.preventDefault();
        navigate("/register");
    }

    return (
        <div className='navbar'>
            <div className='navbarContainer'>
                <span className='logo'>theshylearning</span>
                <div className='navItems'>
                    <button className='navButton' onClick={navToRegister}>Register</button>
                    <button className='navButton' onClick={navToLogin}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar