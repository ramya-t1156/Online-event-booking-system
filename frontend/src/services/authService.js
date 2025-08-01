import axios from "axios";

const API_AUTH_URL = "http://localhost:3001/api/auth";

export const register = (userData)=>{
    return axios.post(`${API_AUTH_URL}/register`, userData);
};

export const login = (userData)=>{
    return axios.post(`${API_AUTH_URL}/login`,userData);
}