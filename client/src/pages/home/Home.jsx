import React from 'react';
import "./home.css";
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import Lessons from '../../components/lessons/Lessons';

const Home = () => {
    return (
        <div className='home'>
            <Navbar/>
            <Header/>
            <div className='homeContainer'>
                <Lessons/>
            </div>
        </div>
    )
}

export default Home