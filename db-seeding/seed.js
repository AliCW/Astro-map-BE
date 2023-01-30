const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Eclipse = require('./backend/models/eclipse-schema')
const { convertArrayOfStringsToJson } = require('./utils/convertArrayToJson')
const { distance } = require('./distance')
const { hybridArrays } = require('./data/hybrid-arrays-all/hybrid-arrays-all')
const { totalArrays } = require('./data/total-arrays-all/total-arrays-all')
const { annularArrays } = require('./data/annular-arrays-all/annular-arrays')
const fs = require('fs/promises')
const ENV = process.env.NODE_ENV || 'development';


require('dotenv').config({    
    path: `${__dirname}/.env.${ENV}`,
});

function runSeed(array) {
    
    
    mongoose.connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to server')
        return Eclipse.collection.drop()
        // maps over the schema and for each saves it to the database
    }).then(() => {
        return array.map((eclipse) => {
            return eclipse.save()
        })
    }).then(() => {
        console.log('saved to database')
    })
    .catch((err) => {
        console.log(err)
    })
}
// creates objects from raw data 
// and concats all arrays together

const hybridEclipseObjects = convertArrayOfStringsToJson(hybridArrays, 'hybrid')
const totalEclipseObjects = convertArrayOfStringsToJson(totalArrays, 'total')
const annularEclipseObjects = convertArrayOfStringsToJson(annularArrays, 'annular')
const allArrays = hybridEclipseObjects.concat(totalEclipseObjects, annularEclipseObjects)

// maps over the objects and creates schema from those objects

const allArraysSchema = allArrays.map((object) => {
    const newObj = new Eclipse({
        'date': object.date,
        'type': object.type,
        'coordinateData': object.coordinateData
    })
    return newObj
})


// const smallArraysSchema = [allArraysSchema[0], allArraysSchema[10], allArraysSchema[27], allArraysSchema[100], allArraysSchema[130], allArraysSchema[201]]

// runSeed(allArraysSchema)

module.exports = { runSeed };

