import React, { useEffect, useState } from 'react';
import "./lessons.css";
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';

const Lessons = () => {
    const [lessons, setLessons] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const callApi = async() => {
            const res = await Api.lessonApi.getAllLessons();
            setLessons(res.data);
        }
        callApi();
    }, []);

    return (
        <div className='lessons'>
            {lessons.map((lesson, index) => {
                return (
                    <div className='lessonItem' key={index}>
                        <img className='lessonImg' src={lesson.imageURL} alt=''/>
                        <div className='lessonTitle'>
                            <h1 className='h1div'>{lesson.name}</h1>
                            <h2 className='h2div'>{lesson.numberCards} flashcards</h2>
                        </div>
                        <button className='lessonBtn' onClick={() => navigate(`/details/${lesson._id}`)}>View Detail</button>
                    </div>
                )
            })}          
        </div>
    )
}

export default Lessons