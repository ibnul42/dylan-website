import axios from "axios"

const API_URL = "http://localhost:5000/api/assets/"

// get all folders
const getFolders = async () => {
  const response = await axios.get(API_URL + "all-dir")

  return response.data
}

const createFolder = async (inputText) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  try {
    const response = await axios.post(
      API_URL + "dir",
      {
        dir: inputText,
      },
      config
    )
    return response.data
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response)
      throw new Error(error.response.data.msg)
    } else {
      throw new Error("An error occurred while creating the folder")
    }
  }
}

const getImages = async (type) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  try {
    const response = await axios.get(API_URL + "all-images/" + type)
    console.log(response)
    return response.data
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response)
      throw new Error(error.response.data.msg)
    } else {
      throw new Error("An error occurred while getting assets")
    }
  }
}

const getAssets = async (type) => {
  try {
    const response = await axios.get(API_URL + "all-assets/")
    console.log(response)
    return response.data
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response)
      throw new Error(error.response.data.msg)
    } else {
      throw new Error("An error occurred while getting assets")
    }
  }
}

const addAssets = async ({ currentType, formData }) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  try {
    const response = await axios.post(
      API_URL + "upload/" + currentType,
      formData,
      config
    )
    console.log(response)
    return response.data
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response)
      throw new Error(error.response.data.msg)
    } else {
      throw new Error("An error occurred while getting assets")
    }
  }
}

const removeAsset = async ({ type, file }) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  try {
    const response = await axios.delete(
      API_URL + "rmFile/" + type + "/" + file,
      config
    )
    console.log(response)
    return response.data
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response)
      throw new Error(error.response.data.msg)
    } else {
      throw new Error("An error occurred while getting assets")
    }
  }
}

const removeFolder = async ({ dir }) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  try {
    const response = await axios.delete(
      API_URL + "rmdIR/" + dir,
      config
    )
    console.log(response)
    return response.data
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response)
      throw new Error(error.response.data.msg)
    } else {
      throw new Error("An error occurred while getting assets")
    }
  }
}

const assetService = {
  getFolders,
  createFolder,
  getImages,
  addAssets,
  removeAsset,
  removeFolder,
  getAssets
}

export default assetService
