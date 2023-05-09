import axios from "axios";

axios.defaults.withCredentials = true;
const REACT_BASE_URL = process.env.REACT_BASE_URL;

const createCard = async(id, data) => {
    const result = await axios.post(`${REACT_BASE_URL}/cards/${id}`, data);
    return result;
}

const editCard = async(id, data) => {
    const result = await axios.put(`${REACT_BASE_URL}/cards/${id}`, data);
    return result;
}

const deleteCard = async(id) => {
    const result = await axios.delete(`${REACT_BASE_URL}/cards/${id}`);
    return result;
}

export const cardApi = {
    createCard,
    editCard,
    deleteCard,
}