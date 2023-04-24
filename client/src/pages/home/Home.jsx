import React from 'react';
import "./home.css";
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';

const Home = () => {
    return (
        <div className='home'>
            <Navbar/>
            <Header/>
        </div>
    )
}

export default Home