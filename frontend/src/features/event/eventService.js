import axios from "axios"

const API_URL = `${import.meta.env.VITE_REACT_DOMAIN_URL}/api/events/`

const singleEvent = async (date) => {
  const response = await axios.post(API_URL + "single-event", {
    date,
  })

  return response.data
}

const eventsByDate = async (date) => {
  const response = await axios.post(API_URL + "eventsbydate", {
    date,
  })

  return response.data
}

const getEvent = async (id) => {
  const response = await axios.get(`${API_URL}${id}`)

  return response.data
}

const allEvent = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const createEvent = async (data) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(API_URL, data, config)

  return response.data
}

const deleteEvent = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.delete(`${API_URL}${id}`, config)

  return response.data
}

const updateEvent = async (data) => {
  const body = {
    title: data.title,
    date: data.date,
    event: data.event,
  }
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.put(`${API_URL}${data.id}`, body, config)

  return response.data
}

const eventService = {
  singleEvent,
  createEvent,
  allEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  eventsByDate,
}

export default eventService
