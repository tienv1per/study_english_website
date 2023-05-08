import React, { useEffect, useState } from 'react';
import "./lessons.css";
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';
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

    const navigate = useNavigate();

    const callApi = async() => {
        const res = await Api.lessonApi.getAllLessons();
        setLessons(res.data);
    }

    useEffect(() => {
        callApi();
    }, []);

    function setButtonToggleAttribute(id, toggle, target) {
        const button = document.querySelector(id);
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
        setButtonToggleAttribute("#buttonAdd", "modal", "#myModalAdd");
    }

    const handleEditLesson = (e) => {
        e.preventDefault();
        setButtonToggleAttribute("#buttonEdit", "modal", "#myModalEdit");
    }

    const handleChange = (e) => {
        e.preventDefault();
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await Api.lessonApi.createLesson(data);
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

    const handleEdit = async(id) => {
        try {
            const res = await Api.lessonApi.editLesson(id, data);
            if (res.data.success) {
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
            <div className='lessons' style={{gridTemplateColumns: "repeat(4, minmax(0, 1fr))"}}>
                {lessons.map((lesson, index) => {
                    return (
                        <div className='lessonItem' key={index}>
                            <img className='lessonImg' src={lesson.imageURL} alt=''/>
                            <div className='lessonTitle'>
                                <h1 className='h1div'>{lesson.name}</h1>
                                <h2 className='h2div'>{lesson.numberCards} flashcards</h2>
                            </div>
                            <div className='buttonDiv'>
                                <button className='lessonBtn' onClick={() => navigate(`/details/${lesson._id}`)}>View Detail</button>
                                <button className='lessonBtn' onClick={handleEditLesson}>Edit Lesson</button>
                                <button className='lessonBtn'>Delete Lesson</button>
                            </div>
                            <div className="modal fade" id="myModalEdit" role="dialog">
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
                                            <button type="button" className="btn btn-primary" onClick={() => handleEdit(lesson._id)}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    )
                })}      
            </div>
            <button type="button" className="btn btn-primary" id="buttonAdd" style={{display: "none"}}>Launch modal</button>
            <button type="button" className="btn btn-primary" id="buttonEdit" style={{display: "none"}}>Launch modal</button>

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
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lessons