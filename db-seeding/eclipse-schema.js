const mongoose = require('mongoose')

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

const Hybrid = mongoose.model('Hybrid', eclipseSchema)

module.exports = Hybrid