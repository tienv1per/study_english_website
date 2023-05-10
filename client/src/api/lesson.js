import axios from "axios";
import Cookies from 'js-cookie';

const REACT_APP_BACKEND_URL = "https://learning-english-backend-pro.onrender.com";
// const REACT_APP_BACKEND_URL = "http://localhost:8000";
const getCookie = () => {
    const cookie = Cookies.get("authen");
    return cookie;
}

const config = () => {
    const cookie = getCookie();
    return {
        headers: { Authorization: `Bearer ${cookie}`}
    }
};

const getLesson = async(id) => {
    const result = await axios.get(`${REACT_APP_BACKEND_URL}/lessons/${id}`);
    return result;
}

const getCardsInLesson = async(id) => {
    const result = await axios.get(`${REACT_APP_BACKEND_URL}/cards/${id}`);
    return result;
}   

const getAllLessons = async() => {
    const result = await axios.get(`${REACT_APP_BACKEND_URL}/lessons`);
    return result;
}

const finishLesson = async (userId, lessonId) => {
    const result = await axios.put(`${REACT_APP_BACKEND_URL}/user/${userId}`, lessonId);
    return result;
}

const createLesson = async(data) => {
    const result = await axios.post(`${REACT_APP_BACKEND_URL}/lessons`, data, config());
    return result;
}

const editLesson = async(id, data) => {
    const result = await axios.put(`${REACT_APP_BACKEND_URL}/lessons/${id}`, data, config());
    return result;
}

const deleteLesson = async(id) => {
    const result = await axios.delete(`${REACT_APP_BACKEND_URL}/lessons/${id}`, config());
    return result;
}

export const lessonApi = {
    getLesson,
    getCardsInLesson,
    getAllLessons,
    finishLesson,
    createLesson,
    editLesson,
    deleteLesson,
};