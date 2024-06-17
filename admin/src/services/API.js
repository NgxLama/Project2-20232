import axios from "axios";

const API_BASE_URL = process.env.NODE_ENV === 'production' ? "https://web-20232.onrender.com" : "http://localhost:5001";

export function register(email, password) {
    return axios.post(`${API_BASE_URL}/register`, {
        email: email,
        password: password
    })
}

export function loginAdmin(email, password) {
    return axios.post(`${API_BASE_URL}/loginAdmin`, {
        email: email,
        password: password
    })
}

export function addMovie(movie){
    return axios.post(`${API_BASE_URL}/addMovie`,movie,
    {   headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

}

export function updateMovieById(id,movie) {
    return axios.put(`${API_BASE_URL}/updateMovieById/${id}`, movie)
}

export function getAllMovie() {
    return axios.get(`${API_BASE_URL}/getAllMovie`)
}

export function getMovieById(id) {
    return axios.get(`${API_BASE_URL}/getMovieById/${id}`)
}

export function deleteMovieById(id) {
    return axios.delete(`${API_BASE_URL}/deleteMovieById/${id}`)
}

export function getAllRooms(){
    return axios.get(`${API_BASE_URL}/getAllRooms`)
}

export function addShowtime(showtimeData){
    return axios.post(`${API_BASE_URL}/addShowtime`, showtimeData)
}

export function getAllShowtimes(){
    return axios.get(`${API_BASE_URL}/getAllShowtimes`)
}

export function deleteShowtimeById(id) {
    return axios.delete(`${API_BASE_URL}/deleteShowtimeById/${id}`)
}

export function updateShowtimeById(id, showtimeData) {
    return axios.put(`${API_BASE_URL}/updateShowtimeById/${id}`, showtimeData)
}

export function getRoomById(id) {
    return axios.get(`${API_BASE_URL}/getRoomById/${id}`)
}

export function getOrderById(id) {
    return axios.get(`${API_BASE_URL}/getOrderById/${id}`)
}

export function getAllOrdersOfUser(id) {
    return axios.get(`${API_BASE_URL}/getAllOrdersOfUser/${id}`)
}

export function getAllOrders() {
    return axios.get(`${API_BASE_URL}/getAllOrders`)
}

export function getnameAndEmail() {
    return axios.get(`${API_BASE_URL}/getnameAndEmail`)
}

export function getProfileByUserId(userId) {
    return axios.get(`${API_BASE_URL}/getProfile/${userId}`);
}

export function updateProfile(userId, profile){
    return axios.post(`${API_BASE_URL}/updateProfile/${userId}`, profile, { 'content-type': 'multipart/form-data' })
}

export function deleteOrderById(id) {
    return axios.post(`${API_BASE_URL}/deleteOrderById/${id}`)
}

export function getAllProfiles() {
    return axios.get(`${API_BASE_URL}/getAllProfiles`)
}