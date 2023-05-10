import React from 'react'
import "./navbar.css";
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";


const Navbar = () => {
    const navigate = useNavigate();

    const cookie = Cookies.get("authen");
    if (!cookie) {
        navigate("/login");
    } else {
        var decoded = jwt_decode(cookie);
        var username = decoded?.username;
    }
    
    const navToLogout = async(e) => {
        e.preventDefault();
        await Api.authApi.logoutApi;
        navigate("/login");
    }

    return (
        <div className='navbar'>
            <div className='navbarContainer'>
                <span className='logo'>theshylearning</span>
                <div className='navItems'>
                    <span>Hello {username}</span>
                    <button className='navButton' onClick={navToLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar