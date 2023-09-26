const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createLink, getLink } = require('../controllers/shortenController')

router.post('/', protect, createLink)
router.get('/:link', getLink)

module.exports = router