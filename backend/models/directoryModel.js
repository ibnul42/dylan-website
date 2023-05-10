const mongoose = require("mongoose")

const directorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
  },
  {
    timestams: true,
  }
)

module.exports = mongoose.model("Directory", directorySchema)
