const asyncHandler = require('express-async-handler')
const Link = require('../models/shortenModal')

const createLink = asyncHandler(async (req, res) => {
    const { originalLink, uniqueId } = req.body

    // check if all fields are inputed
    if (!originalLink || !uniqueId) {
        res.status(404)
        throw new Error('Please enter the link & name you want to create')
    }

    const linkExists = await Link.findOne({ originalLink })

    // check if the user exists
    if (linkExists) {
        res.status(404)
        throw new Error('Link already Exist!')
    }

    // generate a random id
    // let shortenLink = generateID()
    // let unique = false

    // create an unique random id
    // while (!unique) {
    const idExists = await Link.findOne({ shortenLink: uniqueId })
    if (idExists) {
        res.status(404)
        throw new Error('Name already Exist!')
    }
    // else {
    //     unique = true
    // }
    // }

    // create a new user
    const createdLink = await Link.create({
        originalLink,
        shortenLink: `https://dluper.net/${uniqueId}`
    })

    if (createdLink) {
        res.status(201)
        res.json(createdLink)
    } else {
        res.status(404)
        throw new Error('Invalid user data')
    }
})

const getLink = asyncHandler(async (req, res) => {
    const { link } = req.params

    // check if all fields are inputed
    if (!link) {
        res.status(404)
        throw new Error("This link doesn't exist")
    }


    const linkExists = await Link.findOne({ shortenLink: `https://dluper.net/${link}` })

    // check if the user exists
    if (!linkExists) {
        res.status(404)
        throw new Error("This link doesn't exist")
    }

    res.status(200)
    res.json(linkExists.originalLink)
})

// generate id
function generateID() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let id = '';

    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        id += letters[randomIndex];
    }

    return id;
}

module.exports = {
    createLink,
    getLink
}