const mongoose = require('mongoose')

// Create a new schema for our eclipse data
const eclipseSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    coordinateData: {
        type: Array,
        required: true
    }
})

// Create a mongoose model based on the above schema
const Eclipse = mongoose.model('Eclipse', eclipseSchema)


// export the model
module.exports = Eclipse;