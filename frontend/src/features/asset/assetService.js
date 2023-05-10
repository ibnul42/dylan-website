import axios from "axios"

const API_URL = "http://localhost:5000/api/assets/"
const token = JSON.parse(localStorage.getItem("user"))["token"]

// get all folders
const getFolders = async () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.get(API_URL + "all-dir", config)

  return response.data
}

// create folder
// const createFolder = async (inputText) => {
//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   }
//   const response = await axios.post(
//     API_URL + "dir",
//     {
//       dir: inputText,
//     },
//     config
//   )

//   return response.data
// }

const createFolder = async (inputText) => {
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

const assetService = {
  getFolders,
  createFolder,
  getImages,
}

export default assetService
