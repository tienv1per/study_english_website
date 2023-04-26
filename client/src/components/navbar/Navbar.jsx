import React from 'react'
import "./navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const navToLogin = (e) => {
        e.preventDefault();
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
                    <button className='navButton' onClick={navToLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar