const express = require('express')
const router = express.Router()
const { createDir, removeDir, addImages, getDirectory, getImage, getAllImages, removeAsset } = require('../controllers/assetController')
const { protect } = require('../middleware/authMiddleware')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(req.params)
      return cb(null, `assets/${req.params.assetDir}`)
    },
    filename: function (req, file, cb) {
      return cb(null, file.originalname)
    }
})
  
const upload = multer({ storage: storage })

router.post('/dir', protect, createDir)
router.get('/all-dir', protect, getDirectory)
router.get("/all-images/:dir", getAllImages)
router.get('/:dir/:name', getImage)
router.delete('/rmdir/:dir', protect, removeDir)
router.delete('/rmFile/:dir/:file', removeAsset)
router.post('/upload/:assetDir', protect, upload.array('photos', 12), addImages)
// router.post('/login', LoginUser)
// router.get('/me', protect, getMe)
// router.post('/me/update', protect, updateProfile)

module.exports = router