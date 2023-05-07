const mongoose = require('mongoose')

const timelineSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please enter a title']
    },
        description:{
        type: String,
        required: [true, 'Please enter description']
    },   
}, {
    timestams: true
})

module.exports = mongoose.model('Timeline', timelineSchema)