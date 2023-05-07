const express = require('express')
const router = express.Router()
const { createDir, removeDir } = require('../controllers/assetController')
const { protect } = require('../middleware/authMiddleware')

router.post('/dir', protect, createDir)
router.delete('/rmdir/:dir', protect, removeDir)
// router.post('/login', LoginUser)
// router.get('/me', protect, getMe)
// router.post('/me/update', protect, updateProfile)

module.exports = router