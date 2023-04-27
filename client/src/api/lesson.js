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

export const lessonApi = {
    getLesson,
    getCardsInLesson,
    getAllLessons
};