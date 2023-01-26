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
const Hybrid = mongoose.model('Hybrid', eclipseSchema)
const Total = mongoose.model('Total', eclipseSchema)
const Annular = mongoose.model('Annular', eclipseSchema)

// export the model
module.exports = { Hybrid, Total, Annular }