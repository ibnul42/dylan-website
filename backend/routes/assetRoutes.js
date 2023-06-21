const express = require("express")
const router = express.Router()
const {
  createDir,
  removeDir,
  addImages,
  getDirectory,
  getImage,
  getAllImages,
  removeAsset,
  getAllAssets,
} = require("../controllers/assetController")
const { protect } = require("../middleware/authMiddleware")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, `assets/${req.params.assetDir}`)
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
})

const upload = multer({ storage: storage })

router.post("/dir", protect, createDir)
router.get("/all-dir", getDirectory)
router.get("/all-images/:dir", getAllImages)
router.get("/all-assets", getAllAssets)
router.get("/:dir/:name", getImage)
router.delete("/rmdir/:dir", protect, removeDir)
router.delete("/rmFile/:dir/:file", protect, removeAsset)
router.post("/upload/:assetDir", protect, upload.array("photos", 12), addImages)
// router.post('/login', LoginUser)
// router.get('/me', protect, getMe)
// router.post('/me/update', protect, updateProfile)

module.exports = router
