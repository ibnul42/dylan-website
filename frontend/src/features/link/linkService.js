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
        const response = await axios.get(`${API_URL}/link/single/${id}`)
        return response.data
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

const getLinkByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/link/single/name/${name}`)
        return response.data
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

const editLink = async ({ id, data }) => {
    const token = JSON.parse(localStorage.getItem("user"))["token"]
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }
    try {
        const response = await axios.put(`${API_URL}/link/single/${id}`, data, config)
        return response.data.message
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

const getAllLinks = async () => {
    try {
        const response = await axios.get(`${API_URL}/link/alllinks`)
        return response.data
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

const deleteLink = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"))["token"]
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }
    try {
        const response = await axios.delete(`${API_URL}/link/single/${id}`, config)
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
    editLink,
    getLink,
    getLinkByName,
    getAllLinks,
    deleteLink
}

export default linkService