const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const fs = require('fs')
const multer  = require('multer')

const createDir = ( async(req, res) => {
    const path = req.body.dir
    if(!path) {
        res.status(400).json({msg: 'Please input folder name'})
    }
    try {
        fs.mkdirSync(`assets/${path.trim()}`)
        res.status(200).json({msg: 'Created directory'})
      } catch (err) {
        if(err.code === 'EEXIST') {
            console.log('File already exists')
            res.status(400).json({msg: 'File already exists'})
        }
      }    
})

const removeDir = ( async(req, res) => {
    const folderName = `assets/${req.params.dir}`;
    try {
        fs.rmdirSync(folderName)
        res.status(200).json({msg: 'Folder deleted successfully'})
      } catch (err) {

        if(err.code === 'ENOENT') {
            res.status(400).json({msg: 'Folder not found'})
        } else if (err.code === 'ENOTEMPTY') {
            res.status(400).json({msg: 'Folder not empty'})
        } else {
            console.log(err)
        }
      }    
})

const addImages = ( async (req, res) => {
    const type = req.params.type
    // console.log(req.files)
    for (const file of req.files) {
        console.log(file)
    }
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

    res.status(200).json({msg: 'uploaded files successfully'})      
})

module.exports = {
    createDir,
    removeDir,
    addImages
}