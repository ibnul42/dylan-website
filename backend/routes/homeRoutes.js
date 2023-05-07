const express = require("express")
const {
  getTimeline,
  createTimeline,
  getAllTimeline,
  updateTimeline,
  getActivity,
  createActivity,
  updateActivity,
  deleteTimeline,
  deleteActivity,
  getAllActivity,
} = require("../controllers/homeController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/timeline", protect, createTimeline)
router.get("/timeline/:id", protect, getTimeline)
router.put("/timeline/:id", protect, updateTimeline)
router.delete("/timeline/:id", protect, deleteTimeline)
router.get("/timelines", getAllTimeline)

router.post("/activity", protect, createActivity)
router.get("/activity/:id", protect, getActivity)
router.put("/activity/:id", protect, updateActivity)
router.delete("/activity/:id", protect, deleteActivity)
router.get("/activities", getAllActivity)

module.exports = router
