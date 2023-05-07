const express = require("express")
const {
  createContact,
  allContacts,
  createPrayer,
  getPrayers,
  deleteContact,
  deletePrayer
} = require("../controllers/clientController")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")

router.post("/contact", protect, createContact)
router.delete("/contact/:id", protect, deleteContact)
router.get("/contacts", allContacts)
router.post("/prayer", createPrayer)
router.delete("/prayer/:id", protect, deletePrayer)
router.get("/prayers", protect, getPrayers)

module.exports = router
