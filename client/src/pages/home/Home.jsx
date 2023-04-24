import React from 'react';
import "./home.css";
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import Lessons from '../../components/lessons/Lessons';
import Resources from '../../components/resources/Resources';
import MailList from '../../components/mailList/MailList';

const Home = () => {
    return (
        <div className='home'>
            <Navbar/>
            <Header/>
            <div className='homeContainer'>
                <h1 className='homeTitle'>Learning Lessons</h1>
                <Lessons/>
                <h1 className='homeTitle'>Learning Resource</h1>
                <Resources/>
            </div>
            <MailList/>
        </div>
    )
}

export default Home