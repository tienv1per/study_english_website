import React, { useEffect, useState } from 'react';
import "./lessons.css";
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

const Lessons = () => {
    const [lessons, setLessons] = useState([]);
    const cookie = Cookies.get("authen");
    const decoded = jwt_decode(cookie);

    const {isAdmin} = decoded;

    const navigate = useNavigate();

    useEffect(() => {
        const callApi = async() => {
            const res = await Api.lessonApi.getAllLessons();
            setLessons(res.data);
        }
        callApi();
    }, []);

    function setButtonToggleAttribute(toggle, target) {
        const button = document.querySelector("#buttonAdd");
        button.dataset.toggle = toggle;
        button.dataset.target = target;
        button.click();
    }

    const handleAddLesson = (e) => {
        e.preventDefault();
        setButtonToggleAttribute("modal", "#myModal");
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
            <button type="button" class="btn btn-primary" id="buttonAdd" style={{display: "none"}}>Launch modal</button>

            <div className="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Add New Lesson</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="input1">Lesson Name</label>
                                    <input class="form-control" id="input1" placeholder="Enter lesson name"/>
                                </div>
                                <div class="form-group">
                                    <label for="input2">Lesson Image Link</label>
                                    <input class="form-control" id="input2" placeholder="Enter lesson image link"/>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer modelButton">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lessons