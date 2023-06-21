import axios from "axios"

const API_URL = `${import.meta.env.VITE_REACT_DOMAIN_URL}/users/`

// login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    } 
    return response.data
}

// logout user
const logout = () => {
    localStorage.removeItem('user')
}

// update user
const update = async (userData) => {
    const token = JSON.parse(localStorage.getItem('user'))['token']
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(API_URL + 'me/update', userData, config)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    } 
    return response.data
}

const authService = {
    login,
    logout,
    update
}

export default authService