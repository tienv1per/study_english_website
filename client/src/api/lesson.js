import axios from "axios";

const getLesson = async(id) => {
    const result = await axios.get(`http://localhost:8000/lessons/${id}`);
    return result;
}

const getCardsInLesson = async(id) => {
    const result = await axios.get(`http://localhost:8000/cards/${id}`);
    return result;
}   

const getAllLessons = async() => {
    const result = await axios.get("http://localhost:8000/lessons");
    return result;
}

const finishLesson = async (userId, lessonId) => {
    const result = await axios.put(`http://localhost:8000/user/${userId}`, lessonId);
    return result;
}

const createLesson = async(data) => {
    const result = await axios.post("http://localhost:8000/lessons", data);
    return result;
}

const editLesson = async(id, data) => {
    const result = await axios.put(`http://localhost:8000/lessons/${id}`, data);
    return result;
}

export const lessonApi = {
    getLesson,
    getCardsInLesson,
    getAllLessons,
    finishLesson,
    createLesson,
    editLesson,
};