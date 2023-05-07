const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please provide event Title']
    },
    date: {
        type: String
    },
    event: {
        type: Array,
        required: [true, 'Please provide event(s)']
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)