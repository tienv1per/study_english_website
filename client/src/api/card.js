import axios from "axios";

axios.defaults.withCredentials = true;
const REACT_APP_BACKEND_URL = "https://learning-english-website-backend.onrender.com";

const createCard = async(id, data) => {
    const result = await axios.post(`${REACT_APP_BACKEND_URL}/cards/${id}`, data);
    return result;
}

const editCard = async(id, data) => {
    const result = await axios.put(`${REACT_APP_BACKEND_URL}/cards/${id}`, data);
    return result;
}

const deleteCard = async(id) => {
    const result = await axios.delete(`${REACT_APP_BACKEND_URL}/cards/${id}`);
    return result;
}

export const cardApi = {
    createCard,
    editCard,
    deleteCard,
}