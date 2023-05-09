import axios from "axios";

const REACT_BASE_URL = process.env.REACT_BASE_URL;

const getLesson = async(id) => {
    const result = await axios.get(`${REACT_BASE_URL}/lessons/${id}`);
    return result;
}

const getCardsInLesson = async(id) => {
    const result = await axios.get(`${REACT_BASE_URL}/cards/${id}`);
    return result;
}   

const getAllLessons = async() => {
    const result = await axios.get(`${REACT_BASE_URL}/lessons`);
    return result;
}

const finishLesson = async (userId, lessonId) => {
    const result = await axios.put(`${REACT_BASE_URL}/user/${userId}`, lessonId);
    return result;
}

const createLesson = async(data) => {
    const result = await axios.post(`${REACT_BASE_URL}/lessons`, data);
    return result;
}

const editLesson = async(id, data) => {
    const result = await axios.put(`${REACT_BASE_URL}/lessons/${id}`, data);
    return result;
}

const deleteLesson = async(id) => {
    const result = await axios.delete(`${REACT_BASE_URL}/lessons/${id}`);
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