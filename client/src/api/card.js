import axios from "axios";

axios.defaults.withCredentials = true;

const createCard = async(id, data) => {
    const result = await axios.post(`http://localhost:8000/cards/${id}`, data);
    return result;
}

const editCard = async(id, data) => {
    const result = await axios.put(`http://localhost:8000/cards/${id}`, data);
    return result;
}

const deleteCard = async(id) => {
    const result = await axios.delete(`http://localhost:8000/cards/${id}`);
    return result;
}

export const cardApi = {
    createCard,
    editCard,
    deleteCard,
}