import axios from "axios";

const API_AUTH_URL = "https://online-event-booking-system.onrender.com/api/auth";

export const register = (userData)=>{
    return axios.post(`${API_AUTH_URL}/register`, userData);
};

export const login = (userData)=>{
    return axios.post(`${API_AUTH_URL}/login`,userData);

}
