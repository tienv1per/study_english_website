import React, { useEffect, useState } from 'react';
import "./lessons.css";
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';
import _ from "lodash";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

const Lessons = () => {
    const [lessons, setLessons] = useState([]);
    const [err, setErr] = useState("");
    const cookie = Cookies.get("authen");
    const decoded = jwt_decode(cookie);

    const [data, setData] = useState({
        name: "",
        imageURL: "",
    });

    const {isAdmin} = decoded;
    console.log(isAdmin);

    const navigate = useNavigate();

    const callApi = async() => {
        const res = await Api.lessonApi.getAllLessons();
        setLessons(res.data);
    }

    useEffect(() => {
        callApi();
    }, []);

    function setButtonToggleAttribute(toggle, target) {
        const button = document.querySelector("#buttonAdd");
        button.dataset.toggle = toggle;
        button.dataset.target = target;
        button.click();
    }

    const closeModal = () => {
        const button = document.querySelector("#close");
        button.click();
    }

    const handleAddLesson = (e) => {
        e.preventDefault();
        setButtonToggleAttribute("modal", "#myModal");
    }

    const handleChange = (e) => {
        e.preventDefault();
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(_.isNil(data.name) || _.isNil(data.imageURL)) {
            return ;
        }
        try {
            const res = await Api.lessonApi.createLesson(data);
            console.log(456);
            if(!res.data.success) {
                setErr(res.data.message);
                return ;
            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
        closeModal();
        callApi();
    }

    return (
        <div>
            <button className='lessonBtn' disabled={!isAdmin} onClick={handleAddLesson}>Add New Lesson</button>
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
            <button type="button" className="btn btn-primary" id="buttonAdd" style={{display: "none"}}>Launch modal</button>

            <div className="modal fade" id="myModal" role="dialog">
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
                                    <label htmlFor="input1">Lesson Name</label>
                                    <input 
                                        className="form-control" 
                                        name='name'
                                        value={data.name}
                                        onChange={handleChange}
                                        placeholder="Enter lesson name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="input2">Lesson Image Link</label>
                                    <input 
                                        className="form-control"  
                                        name='imageURL'
                                        value={data.imageURL}
                                        onChange={handleChange}
                                        placeholder="Enter lesson image link"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer modelButton">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="close">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lessons