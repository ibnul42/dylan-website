const mongoose = require('mongoose')

const shortenSchema = mongoose.Schema(
    {
        originalLink: {
            type: String,
            required: [true, "Please enter a link"],
        },
        shortenLink: {
            type: String,
            required: [true, "Please enter a link"],
        },
    },
    {
        timestams: true,
    }
)

module.exports = mongoose.model('Links', shortenSchema)