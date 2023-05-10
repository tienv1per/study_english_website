import axios from "axios";

const REACT_APP_BACKEND_URL = "https://learning-english-backend-pro.onrender.com";
// const REACT_APP_BACKEND_URL = "http://localhost:8000";

const registerApi = async(data) => {
    const result = await axios.post(`${REACT_APP_BACKEND_URL}/user/register`, data);
    return result;
}

const loginApi = async(data) => {
    const result = await axios.post(`${REACT_APP_BACKEND_URL}/user/login`, data);
    return result;
}

const logoutApi = async() => {
    return await axios.post(`${REACT_APP_BACKEND_URL}/user/logout`);
}

export const authApi = {
    registerApi,
    loginApi,
    logoutApi
};