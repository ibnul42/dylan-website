import axios from "axios"

const API_URL = `${import.meta.env.VITE_REACT_DOMAIN_URL}`

const createLink = async (data) => {
    const token = JSON.parse(localStorage.getItem('user'))['token']
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.post(`${API_URL}/link`, data, config)
        return response.data
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

const getLink = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/link/${id}`)
        return response.data
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

const linkService = {
    createLink,
    getLink
}

export default linkService