import axios from "axios";

const registerApi = async(data) => {
    const result = await axios.post("http://localhost:8000/user/register", data);
    return result;
}

const loginApi = async(data) => {
    const result = await axios.post("http://localhost:8000/user/login", data);
    return result;
}

export const authApi = {
    registerApi,
    loginApi,
};