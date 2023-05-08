import axios from "axios";

const createCard = async(id, data) => {
    const result = await axios.post(`http://localhost:8000/cards/${id}`, data);
    return result;
}

export const cardApi = {
    createCard,
}