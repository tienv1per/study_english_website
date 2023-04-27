import React, { useEffect, useRef, useState } from 'react';
import "./lesson.css";
import Bachelor from "../../image/bachelor.webp";

const Lesson = () => {
    const cardsRef = useRef();

    useEffect(() => {
        const cards = cardsRef.current.querySelectorAll('.card');
        [...cards].forEach((card) => {
            card.addEventListener('click', () => {
                card.classList.toggle("is-flipped");
            })
        })
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        // cal api
        // set card state
        // 
    }, []);

    return (
        <div className='lesson'>
            <h1>Lesson Detail</h1>
            <h2>Education</h2>
            <h3>123 flash cards</h3>
            <div class="scene scene--card" onClick={handleClick} ref={cardsRef}>
                <div class="card">
                    <div class="card__face card__face--front">
                        <div>Bachelor of Science</div>
                        <img className='imageInfo' style={{width: "200px"}} src={Bachelor} alt=''/>
                    </div>
                    <div class="card__face card__face--back">an undergraduate academic degree awarded by colleges and universities upon completion of a course of study lasting three to six years</div>
                </div>
            </div>
            <div className='btn'>
                <button className='lessonBtn'>Prev Card</button>
                <button className='lessonBtn'>Next Card</button>
            </div>
            
        </div>
    )
}

export default Lesson