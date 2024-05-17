import axios from 'axios'

const API_BASE_URL = process.env.NODE_ENV === 'production' ? "https://web-20232.onrender.com" : "http://localhost:5000";

export function register(email, password) {
    return axios.post(`${API_BASE_URL}/register`, {
        email: email,
        password: password
    })
}

export function login(email, password) {
    return axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password
    })
}

export function getProfileByUserId(userId) {
    return axios.get(`${API_BASE_URL}/getProfile/${userId}`);
}

export function updateProfile(userId, profile){
    return axios.post(`${API_BASE_URL}/updateProfile/${userId}`, profile, { 'content-type': 'multipart/form-data' })
}

export function getAllMovie() {
    return axios.get(`${API_BASE_URL}/getAllMovie`)
}

export function findMovie(search) {
    // return axios.get(`${API_BASE_URL}/findMovie?search=${search}`)
    return axios.get(`${API_BASE_URL}/findMovie${search}`)
}

export function getMovieById(id) {
    return axios.get(`${API_BASE_URL}/getMovieById/${id}`)
}

export function getAllSeatsOfRoom(id) {
    return axios.get(`${API_BASE_URL}/getAllSeatsOfRoom/${id}`)
}

export function savePayment(order) {
    return axios.post(`${API_BASE_URL}/savePayment`, order, { 'content-type': 'multipart/form-data' })
}