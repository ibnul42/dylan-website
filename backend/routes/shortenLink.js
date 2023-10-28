const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createLink, getLink, getAllLinks, editLink, deleteLink, getLinkByName } = require('../controllers/shortenController')

router.post('/', protect, createLink)
router.get('/single/:link', getLink)
router.get('/single/name/:name', getLinkByName)
router.put('/single/:id', protect, editLink)
router.delete('/single/:id', protect, deleteLink)
router.get('/alllinks', getAllLinks)

module.exports = router