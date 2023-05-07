const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const fs = require('fs')

const registerUser = asyncHandler( async(req, res) => {
    const { name, email, password } = req.body

    // check if all fields are inputed
    if(!name || !email || !password) {
        res.status(404)
        throw new Error('Please enter all fields')
    }

    const userExists = await User.findOne({email})

    // check if the user exists
    if(userExists) {
        res.status(404)
        throw new Error('User already Exist')
    }

    // hash the password
    const solt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, solt)

    // create a new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201)
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(404)
        throw new Error('Invalid user data')
    }
})

const LoginUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(404)
        throw new Error('Invalid credentials')
    }

    const user = await User.findOne({ email })
    if(!user) {
        res.status(404)
        throw new Error('Invalid credentials')
    }

    if(email && (await bcrypt.compare(password, user.password))) {
        res.status(200)
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }  else {
        res.status(404)
        throw new Error('Invalid credentials')
    }
})

const getMe = asyncHandler( async(req, res) => {
    res.json({ 
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    })
})

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

module.exports = {
    registerUser,
    LoginUser,
    getMe,
    createDir,
    removeDir
}