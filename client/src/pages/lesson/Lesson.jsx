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
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                card.classList.toggle("is-flipped");
            })
        })
    }, [Cards]);

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
        setButtonToggleAttribute("modal", "#myModal");
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

    function setButtonToggleAttribute(toggle, target) {
        const button = document.querySelector("#buttonModal");
        button.dataset.toggle = toggle;
        button.dataset.target = target;
        button.click();
    }

    return (
        <div className='lesson'>
            <h1>Lesson Detail</h1>
            <h2>{lesson}</h2>
            <h3>{curIndex + 1} / {numCards} flash cards</h3>
            <div className='btn'>
                <button className='lessonBtn' onClick={handleBack}>Back</button>
                <button className='lessonBtn' onClick={finishCard}>Finish</button>
            </div>
            <div className="scene scene--card" ref={cardsRef}>
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
            <div className="container">
                <button className="btn btn-info btn-lg" id="buttonModal" style={{display: "none"}}>Open Modal</button>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h2 className="modal-title">Finish Lesson</h2>
                            </div>
                            <div className="modal-body">
                                <p style={{fontSize: "20px"}}>You have finish this lesson. Congratulations!!!</p>
                            </div>
                            <div className="modal-footer click-btn">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className='home-btn' data-dismiss="modal" onClick={handleBack}>Back To Home Page</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lesson