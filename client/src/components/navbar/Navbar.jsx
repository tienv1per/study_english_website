import React from 'react'
import "./navbar.css";
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';

const Navbar = () => {
    const navigate = useNavigate();
    const navToLogout = async(e) => {
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
                    <span>Hello Tien</span>
                    <button className='navButton' onClick={navToLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar