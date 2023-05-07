const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a name']
    },
    email:{
        type: String,
        required: [true, 'Please enter a email'],
        unique: true
    },
    address:{
        type: String,
        required: [true, 'Please enter a address']
    },    
}, {
    timestams: true
})

module.exports = mongoose.model('Contact', contactSchema)