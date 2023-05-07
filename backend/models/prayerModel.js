const mongoose = require("mongoose")

const prayerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email address"],
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
      required: [true, "Please write your prayer"],
    },
  },
  {
    timestams: true,
  }
)

module.exports = mongoose.model("Prayer", prayerSchema)
