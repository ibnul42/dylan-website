const mongoose = require('mongoose')

const assetSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please enter a name']
    },
    id:{
        type: String,
        // required: [true, 'Please enter an id'],
        // unique: true
    },
    type:{
        type: String,
        required: [true, 'Please enter a type']
    },
    source:{
        type: String,
        required: [true, 'Invalid source']
    },
}, {
    timestams: true
})

module.exports = mongoose.model('Asset', assetSchema)