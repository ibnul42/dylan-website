const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const fs = require("fs")
const multer = require("multer")
const Directory = require("../models/directoryModel")
const Asset = require("../models/assetModel")

const createDir = asyncHandler(async (req, res) => {
  const path = req.body.dir
  if (!path) {
    res.status(400).json({ msg: "Please input folder name" })
  }
  try {
    fs.mkdirSync(`assets/${path.trim().split(" ").join("_")}`)
    Directory.create({
      name: path.trim().split(" ").join("_"),
    })
    res.status(200).json({
      status: true,
      msg: "Created directory",
    })
  } catch (err) {
    if (err.code === "EEXIST") {
      res.status(400).json({ msg: "File already exists" })
    }
  }
})

const getDirectory = asyncHandler(async (req, res) => {
  const dir = await Directory.find()
  res.status(200).send(dir)
})

const getAllAssets = asyncHandler(async (req, res) => {
  const assets = await Asset.find()
  res.status(200).send(assets)
})

const removeDir = asyncHandler(async (req, res) => {
  const folderName = `assets/${req.params.dir}`
  try {
    await fs.promises.rmdir(folderName)
    await Directory.findOneAndDelete({ name: req.params.dir })
    res.status(200).json({ msg: "Folder deleted successfully" })
  } catch (err) {
    if (err.code === "ENOENT") {
      res.status(400).json({ msg: "Folder not found" })
    } else if (err.code === "ENOTEMPTY") {
      res.status(400).json({ msg: "Folder not empty" })
    } else {
      console.log(err)
    }
  }
})

const removeAsset = asyncHandler(async (req, res) => {
  const folderName = `assets/${req.params.dir}`
  const { dir, file } = req.params

  try {
    // Remove the file from disk
    await fs.promises.unlink(`assets/${req.params.dir}/${req.params.file}`)

    // Remove the corresponding document from the database
    await Asset.findOneAndDelete({ title: file, type: dir })

    res.status(200).json({ msg: "File deleted successfully" })
  } catch (err) {
    if (err.code === "ENOENT") {
      res.status(400).json({ msg: "File not found" })
    } else {
      console.error(err)
      res.status(500).json({ msg: "Server error" })
    }
  }
})

const addImages = asyncHandler(async (req, res) => {
  const assetDir = req.params.assetDir
  for (const file of req.files) {
    // console.log(file.originalName)
    // console.log(file)
    Asset.create({
      title: file.originalname,
      type: assetDir,
      source: `/assets/${assetDir}/${file.originalname}`,
    })
  }
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any

  res.status(200).json({ msg: "uploaded files successfully" })
})

const getImage = asyncHandler(async (req, res) => {
  const { dir, name } = req.params
  res.download(`./assets/${dir}/${name}`)
})

const getAllImages = asyncHandler(async (req, res) => {
  const { dir } = req.params
  const assets = await Asset.find({ type: dir })
  res.status(200).json(assets)
})

module.exports = {
  createDir,
  removeDir,
  removeAsset,
  addImages,
  getDirectory,
  getImage,
  getAllImages,
  getAllAssets,
}
