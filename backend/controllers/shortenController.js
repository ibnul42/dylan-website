const asyncHandler = require('express-async-handler')
const Link = require('../models/shortenModal')

const createLink = asyncHandler(async (req, res) => {
    const { originalLink, uniqueId, displayName } = req.body

    // check if all fields are inputed
    if (!originalLink || !uniqueId || !displayName) {
        res.status(404)
        throw new Error('Please enter all fields')
    }

    const linkExists = await Link.findOne({ originalLink })

    // check if the user exists
    if (linkExists) {
        res.status(404)
        throw new Error('Link already Exist!')
    }

    const idExists = await Link.findOne({ shortenLink: `${process.env.URL}/${uniqueId}` })
    if (idExists) {
        res.status(404)
        throw new Error('Name already Exist!')
    }

    // create a new user
    const createdLink = await Link.create({
        originalLink,
        displayName,
        shortenLink: `${process.env.URL}/${uniqueId}`
    })

    if (createdLink) {
        res.status(201)
        res.json(createdLink)
    } else {
        res.status(404)
        throw new Error('Invalid user data')
    }
})

const editLink = asyncHandler(async (req, res) => {
    const { originalLink, uniqueId, displayName } = req.body
    const { id } = req.params

    if (id.length !== 24) {
        res.status(404)
        throw new Error('Link not found')
    }
    const idExists = await Link.findOne({ _id: id })
    if (!idExists) {
        res.status(404)
        throw new Error('Link not found')
    }


    // check if all fields are inputed
    if (!originalLink || !uniqueId || !displayName) {
        res.status(404)
        throw new Error('Please enter all fields')
    }

    if (idExists.originalLink !== originalLink) {
        const linkExists = await Link.findOne({ originalLink })

        // check if the user exists
        if (linkExists) {
            res.status(404)
            throw new Error('Link already Exist!')
        }
    }

    if (idExists.shortenLink !== `${process.env.URL}/${uniqueId}`) {
        const nameExists = await Link.findOne({ shortenLink: `${process.env.URL}/${uniqueId}` })
        if (nameExists) {
            res.status(404)
            throw new Error('Name already Exist!')
        }
    }

    // edit user
    const editLink = await Link.findByIdAndUpdate(id, {
        originalLink,
        displayName,
        shortenLink: `${process.env.URL}/${uniqueId}`
    })

    if (editLink) {
        res.status(201)
        res.json({ message: 'Link updated successfully' })
    } else {
        res.status(404)
        throw new Error('Invalid user data')
    }
})

const getLink = asyncHandler(async (req, res) => {
    const { link } = req.params

    // check if all fields are inputed
    if (!link || link.length !== 24) {
        res.status(404)
        throw new Error("This link doesn't exist")
    }

    const linkExists = await Link.findById(link)

    // check if the user exists
    if (!linkExists) {
        res.status(404)
        throw new Error("This link doesn't exist")
    }

    res.status(200)
    res.json(linkExists)
})

const getLinkByName = asyncHandler(async (req, res) => {
    const { name } = req.params

    const linkExists = await Link.findOne({ shortenLink: `${process.env.URL}/${name}` })

    // check if the user exists
    if (!linkExists) {
        res.status(404)
        throw new Error("This link doesn't exist")
    }

    res.status(200)
    res.json(linkExists)
})

const getAllLinks = asyncHandler(async (req, res) => {

    const links = await Link.find()

    res.status(200)
    res.json(links.reverse())
})
const deleteLink = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (id.length !== 24) {
        res.status(404)
        throw new Error('Link not found')
    }
    const LinkExist = await Link.findById(id)

    if (!LinkExist) {
        throw new Error("Link not found")
    }

    await Link.findByIdAndDelete(id)

    res.status(200).json({
        message: "Link deleted successfully",
    })
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
    editLink,
    getLink,
    getLinkByName,
    deleteLink,
    getAllLinks
}