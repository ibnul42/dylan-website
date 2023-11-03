const mongoose = require('mongoose')

const shortenSchema = mongoose.Schema(
    {
        originalLink: {
            type: String,
            required: [true, "Please enter a link"],
        },
        displayName: {
            type: String,
            required: [true, "Please enter a link"],
        },
        shortenLink: {
            type: String,
            required: [true, "Please enter a link"],
        },
        order: {
            type: Number,
            required: [false]
        }
    },
    {
        timestams: true,
    }
)

module.exports = mongoose.model('Links', shortenSchema)