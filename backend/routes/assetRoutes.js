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
  thumbnailImage,
  updateThumbnailImage,
  removeThumb,
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

const singleStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, `assets/${req.params.assetDir}`)
  },
  filename: function (req, file, cb) {
    return cb(null, 'thumbnail.jpg');
  },
})

const upload = multer({ storage: storage })
const uploadSingle = multer({ storage: singleStorage })

router.post("/dir", protect, createDir)
router.get("/all-dir", getDirectory)
router.get("/all-images/:dir", getAllImages)
router.get("/all-assets", getAllAssets)
router.get("/:dir/:name", getImage)
router.delete("/rmdir/:dir", protect, removeDir)
router.delete("/rmFile/:dir/:file", protect, removeAsset)
router.delete("/rmThumb/:dir", protect, removeThumb)
router.post(
  "/upload/:assetDir",
  protect,
  // checkRug,
  upload.array("photos", 12), 
  addImages
)
router.post("/upload/thumbnail/:assetDir", protect, uploadSingle.single('thumbnail'), thumbnailImage)
router.put("/upload/thumbnail/:assetDir/:id", protect, uploadSingle.single('thumbnail'), updateThumbnailImage)

module.exports = router
