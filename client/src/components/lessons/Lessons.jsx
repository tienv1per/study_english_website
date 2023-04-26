import React from 'react';
import "./lessons.css";
import Education from "../../image/education.webp";
import Movie from "../../image/movie.webp";
import Sport from "../../image/sport.webp";
import Food from "../../image/food.webp";
import { useNavigate } from 'react-router-dom';

const Lessons = () => {
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        navigate("/details");
    }

    return (
        <div className='lessons'>
            <div className='lessonItem'>
                <img className='lessonImg' src={Education} alt=''/>
                <div className='lessonTitle'>
                    <h1 className='h1div'>Education</h1>
                    <h2 className='h2div'>123</h2>
                </div>
                <button className='lessonBtn' onClick={handleClick}>View Detail</button>
            </div>
            <div className='lessonItem'>
                <img className='lessonImg' src={Movie} alt=''/>
                <div className='lessonTitle'>
                    <h1 className='h1div'>Movie</h1>
                    <h2 className='h2div'>123</h2>
                </div>
                <button className='lessonBtn'>View Detail</button>
            </div>
            <div className='lessonItem'>
                <img className='lessonImg' src={Sport} alt=''/>
                <div className='lessonTitle'>
                    <h1 className='h1div'>Sport</h1>
                    <h2 className='h2div'>123</h2>
                </div>
                <button className='lessonBtn'>View Detail</button>
            </div>
            <div className='lessonItem'>
                <img className='lessonImg' src={Food} alt=''/>
                <div className='lessonTitle'>
                    <h1 className='h1div'>Food</h1>
                    <h2 className='h2div'>123</h2>
                </div>
                <button className='lessonBtn'>View Detail</button>
            </div>            
        </div>
    )
}

export default Lessons