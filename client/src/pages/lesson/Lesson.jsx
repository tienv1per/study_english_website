import React, { useEffect, useRef, useState } from 'react';
import "./lesson.css";
import { Api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const Lesson = () => {
    const navigate = useNavigate();

    const cardsRef = useRef();
    const [Cards, setCards] = useState([]); 
    const [lesson, setLesson] = useState("");
    const [curIndex, setCurIndex] = useState(0);
    const [numCards, setNumCards] = useState(0);

    const id = useParams();

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
        const callApi = async() => {
            const result = await Api.lessonApi.getLesson(id.id);
            const cardsRes = await Api.lessonApi.getCardsInLesson(id.id);
            setCards(cardsRes.data);
            setNumCards(cardsRes.data.length);
            setLesson(result.data.name);
        }

        callApi();
    }, []);

    const nextCard = (e) => {
        e.preventDefault();
        if(curIndex + 1 < numCards) {
            return setCurIndex((prev) => prev + 1);
        }
        return setCurIndex(curIndex);
    }

    const prevCard = (e) => {
        e.preventDefault();
        if(curIndex > 0) {
            return setCurIndex((prev) => prev - 1);
        }
        return setCurIndex(curIndex);
    }

    const handleBack = (e) => {
        e.preventDefault();
        navigate("/");
    }

    const finishCard = (e) => {
        e.preventDefault();
    }

    return (
        <div className='lesson'>
            <h1>Lesson Detail</h1>
            <h2>{lesson}</h2>
            <h3>{numCards} flash cards</h3>
            <div className='btn'>
                <button className='lessonBtn' onClick={handleBack}>Back</button>
                <button className='lessonBtn' onClick={finishCard}>Finish</button>
            </div>
            <div className="scene scene--card" onClick={handleClick} ref={cardsRef}>
                {Cards.map((card, index) => {
                    return (
                        <div className="card" style={{display: index === curIndex ? "block" : "none"}} key={index}>
                            <div className="card__face card__face--front">
                                <div>{card.name}</div>
                                <img className='imageInfo' src={card.imageURL} alt=''/>
                            </div>
                            <div className="card__face card__face--back">{card.desc}</div>
                        </div>)
                })}
            </div>
            <div className='btn'>
                <button className='lessonBtn' onClick={prevCard}>Prev Card</button>
                <button className='lessonBtn' onClick={nextCard}>Next Card</button>
            </div>
        </div>
    )
}

export default Lesson