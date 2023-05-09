import axios from "axios"

const API_URL = "http://localhost:5000/api/clients/"

const getContacts = async () => {
  const response = await axios.get(API_URL + "contacts")

  return response.data
}

const createContact = async (data) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(`${API_URL}contact`, data, config)

  return response.data
}

const deleteContact = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.delete(`${API_URL}contact/${id}`, config)

  return response.data
}

const createPrayer = async (data) => {
  const response = await axios.post(`${API_URL}prayer`, data)

  return response.data
}

const getPrayers = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.get(`${API_URL}prayers`, config)

  return response.data
}

const deletePrayer = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.delete(`${API_URL}prayer/${id}`, config)

  return response.data
}

const clientService = {
  getContacts,
  createContact,
  deleteContact,
  createPrayer,
  getPrayers,
  deletePrayer
}

export default clientService
