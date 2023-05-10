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

const createCard = async(id, data) => {
    const result = await axios.post(`${REACT_APP_BACKEND_URL}/cards/${id}`, data, config());
    return result;
}

const editCard = async(id, data) => {
    const result = await axios.put(`${REACT_APP_BACKEND_URL}/cards/${id}`, data, config());
    return result;
}

const deleteCard = async(id) => {
    const result = await axios.delete(`${REACT_APP_BACKEND_URL}/cards/${id}`, config());
    return result;
}

export const cardApi = {
    createCard,
    editCard,
    deleteCard,
}