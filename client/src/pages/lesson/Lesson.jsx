import React, { useEffect, useRef, useState } from 'react';
import "./lesson.css";
import { Api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

const Lesson = () => {
    const navigate = useNavigate();

    const cookie = Cookies.get("authen");
    const decoded = jwt_decode(cookie);

    const cardsRef = useRef();
    const [Cards, setCards] = useState([]); 
    const [lesson, setLesson] = useState("");
    const [curIndex, setCurIndex] = useState(0);
    const [numCards, setNumCards] = useState(0);
    const [err, setErr] = useState("");

    const [data, setData] = useState({
        name: "",
        imageURL: "",
        desc: "",
    });

    // cal api
    const callApi = async() => {
        const result = await Api.lessonApi.getLesson(id.id);
        const cardsRes = await Api.lessonApi.getCardsInLesson(id.id);
        setCards(cardsRes.data);
        setNumCards(cardsRes.data.length);
        setLesson(result.data.name);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setData({...data, [e.target.name]: e.target.value});
    }

    const id = useParams();
    console.log(id);

    useEffect(() => {
        const cards = cardsRef.current.querySelectorAll('.card');
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                card.classList.toggle("is-flipped");
            })
        })
    }, [Cards]);

    useEffect(() => {
        callApi();
    }, []);

    const nextCard = (e) => {
        e.preventDefault();
        if(curIndex + 1 < numCards) {
            return setCurIndex((prev) => prev + 1);
        }
        finishAll();
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

    function setButtonToggleAttribute(id, toggle, target) {
        const button = document.querySelector(id);
        button.dataset.toggle = toggle;
        button.dataset.target = target;
        button.click();
    }

    const finishAll = async() => {
        await Api.lessonApi.finishLesson(decoded.id, {
            "lessonId": id.id,
        });
        setButtonToggleAttribute("#buttonModal", "modal", "#myModal");
    }

    const closeModal = () => {
        const button = document.querySelector("#close");
        button.click();
    }

    const addCardModal = (e) => {
        e.preventDefault();
        setButtonToggleAttribute("#buttonAdd", "modal", "#myModalAdd");
    }

    const handleAddCard = async(e) => {
        e.preventDefault();
        try {
            const res = await Api.cardApi.createCard(id.id, data);
            if(!res.data.success) {
                setErr(res.data.message);
                return;
            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
        setData({
            name: "",
            imageURL: "",
            desc: "",
        })
        closeModal();
        // callApi();
    }

    const editCardModal = (e) => {
        e.preventDefault();
        setButtonToggleAttribute("#buttonEdit", "modal", "#myModalEdit");
    }

    const handleEdit = async(id) => {
        try {
            const res = await Api.cardApi.editCard(id, data);
            if (!res.data.success) {
                setErr(res.data.message);
                return;
            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
        setData({
            name: "",
            imageURL: "",
            desc: "",
        })
        const button = document.querySelector(`#closeEdit`);
        button.click();
        callApi();
    }

    const deleteCardModal = (e) => {
        e.preventDefault();
        setButtonToggleAttribute("#buttonDelete", "modal", `#myModalDelete`);
    }

    const handleDelete = async (id) => {
        try {
            const res = await Api.cardApi.deleteCard(id);
            if (!res.data.success) {
                setErr(res.data.message);
                return;
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        const button = document.querySelector(`#deleteModal`);
        button.click();
        // callApi();
    }

    return (
        <div className='lesson'>
            <h1>Lesson Detail</h1>
            <h2>{lesson}</h2>
            <h3>{numCards !== 0 ? (curIndex + 1) : 0} / {numCards} flash cards</h3>
            <div className='btn'>
                <button className='lessonBtn' onClick={addCardModal}>Add New Card</button>
                <button className='lessonBtn' onClick={editCardModal}>Edit Card</button>
                <button className='lessonBtn' onClick={deleteCardModal}>Delete Card</button>
            </div>
            <div className='btn'>
                <button className='lessonBtn' onClick={handleBack}>Back</button>
                <button className='lessonBtn' onClick={finishAll}>Finish</button>
            </div>
            <div className="scene scene--card sceneTag" ref={cardsRef}>
                {Cards.map((card, index) => {
                    return ( 
                        <div className="card" style={{display: index === curIndex ? "block" : "none"}} key={index}>
                            <div className="card__face card__face--front">
                                <div>{card.name}</div>
                                <img className='imageInfo' src={card.imageURL} alt=''/>
                            </div>
                            <div className="card__face card__face--back">{card.desc}</div>
                        </div>
                        )
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
            <button type="button" className="btn btn-primary" id="buttonAdd" style={{display: "none"}}>Launch modal</button>
            
            <div className="modal fade" id="myModalAdd" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Add New Lesson</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="input1">Card Name</label>
                                    <input 
                                        className="form-control" 
                                        name='name'
                                        value={data.name}
                                        onChange={handleChange}
                                        placeholder="Enter card name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="input2">Card Image Link</label>
                                    <input 
                                        className="form-control"  
                                        name='imageURL'
                                        value={data.imageURL}
                                        onChange={handleChange}
                                        placeholder="Enter card image link"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="input2">Card Description</label>
                                    <input 
                                        className="form-control"  
                                        name='desc'
                                        value={data.desc}
                                        onChange={handleChange}
                                        placeholder="Enter card description"
                                    />
                                </div>
                            </form>
                            {err && <span style={{
                            color: "red", fontSize: "16px", 
                            alignSelf: "flex-end",
                            marginRight: "5px",
                            }}>
                            {err}
                            </span>}
                        </div>
                        <div className="modal-footer modelButton">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="close">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddCard}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-primary" id="buttonEdit" style={{display: "none"}}>Launch modal</button>
            <div className="modal fade" id={`myModalEdit`} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Edit Lesson</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                            <div className="form-group">
                                    <label htmlFor="input1">Card Name</label>
                                    <input 
                                        className="form-control" 
                                        name='name'
                                        value={data.name}
                                        onChange={handleChange}
                                        placeholder="Enter card name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="input2">Card Image Link</label>
                                    <input 
                                        className="form-control"  
                                        name='imageURL'
                                        value={data.imageURL}
                                        onChange={handleChange}
                                        placeholder="Enter card image link"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="input2">Card Description</label>
                                    <input 
                                        className="form-control"  
                                        name='desc'
                                        value={data.desc}
                                        onChange={handleChange}
                                        placeholder="Enter card description"
                                    />
                                </div>
                            </form>
                            {err && <span style={{
                            color: "red", fontSize: "16px", 
                            alignSelf: "flex-end",
                            marginRight: "5px",
                            }}>
                            {err}
                            </span>}
                        </div>
                        <div className="modal-footer modelButton">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id={`closeEdit`}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleEdit(Cards[curIndex]._id)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-primary" id="buttonDelete" style={{display: "none"}}>Delete</button>
            <div className="modal fade" id={`myModalDelete`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Confirm Delete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this item?
                        </div>
                        <div className="modal-footer deleteFooter">
                            <button type="button" className="btn btn-secondary deleteBtn" data-dismiss="modal"id={`deleteModal`}>Cancel</button>
                            <button type="button" className="btn btn-danger deleteBtn" id="confirm" onClick={() => handleDelete(Cards[curIndex]._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lesson