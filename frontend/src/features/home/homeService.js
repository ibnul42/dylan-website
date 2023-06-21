import axios from "axios"

const API_URL = `${import.meta.env.VITE_REACT_DOMAIN_URL}/home/`

const getAllTimeline = async () => {
  const response = await axios.get(`${API_URL}timelines`)

  return response.data
}

const createTimeline = async (data) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(`${API_URL}timeline`, data, config)

  return response.data
}

const deleteTimeline = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.delete(`${API_URL}timeline/${id}`, config)

  return response.data
}

const getAllActivities = async () => {
  const response = await axios.get(`${API_URL}activities`)

  return response.data
}

const createActivity = async (data) => {
  console.log(data)
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(`${API_URL}activity`, data, config)

  return response.data
}

const deleteActivity = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.delete(`${API_URL}activity/${id}`, config)

  return response.data
}

const eventService = {
  getAllTimeline,
  getAllActivities,
  createActivity,
  createTimeline,
  deleteTimeline,
  deleteActivity,
}

export default eventService
