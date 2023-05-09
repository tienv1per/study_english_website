import axios from "axios";

const REACT_BASE_URL = process.env.REACT_BASE_URL;

const registerApi = async(data) => {
    const result = await axios.post(`${REACT_BASE_URL}/user/register`, data);
    return result;
}

const loginApi = async(data) => {
    const result = await axios.post(`${REACT_BASE_URL}/user/login`, data);
    return result;
}

const logoutApi = async() => {
    return await axios.post(`${REACT_BASE_URL}/user/logout`);
}

export const authApi = {
    registerApi,
    loginApi,
    logoutApi
};