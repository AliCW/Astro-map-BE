const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Hybrid, Total, Annular } = require('./eclipse-schema')
const { convertArrayOfStringsToJson } = require('./utils/convertArrayToJson')
const { hybridArrays } = require('.data/hybrid-arrays-all/hybrid-arrays-all')
const { totalArrays } = require('.data/total-arrays-all/total-arrays-all')
const { annularArrays } = require('.data/annular-arrays-all/annular-arrays')
require('dotenv').config({
        path: `${__dirname}/.env`,
      });

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to server')
    Hybrid.collection.drop()
    // maps over the schema and for each saves it to the database
    return hybridEclipseSchema.map((eclipse) => {
        return eclipse.save()
    })
}).then(() => {
    Total.collection.drop()
    console.log('saved hybrids to database')
    return totalEclipseSchema.map((eclipse) => {
        return eclipse.save()
    })
}).then(() => {
    Annular.collection.drop()
    console.log('saved totals to database')
    return annularEclipseSchema.map((eclipse) => {
        return eclipse.save()
    })
}).then(() => {
    console.log('saved annulars to database')
}).catch((err) => {
    console.log(err)
})

// creates objects from raw data
const hybridEclipseObjects = convertArrayOfStringsToJson(hybridArrays, 'hybrid')
const totalEclipseObjects = convertArrayOfStringsToJson(totalArrays, 'total')
const annularEclipseObjects = convertArrayOfStringsToJson(annularArrays, 'annular')

// maps over the objects and creates schema from those objects
const hybridEclipseSchema = hybridEclipseObjects.map((object) => {
    const newObj =  new Hybrid({
        'date': object.date,
        'type': object.type,
        'coordinateData': object.coordinateData
    })
    return newObj
})

const totalEclipseSchema = totalEclipseObjects.map((object) => {
    const newObj =  new Total({
        'date': object.date,
        'type': object.type,
        'coordinateData': object.coordinateData
    })
    return newObj
})

const annularEclipseSchema = annularEclipseObjects.map((object) => {
    const newObj =  new Annular({
        'date': object.date,
        'type': object.type,
        'coordinateData': object.coordinateData
    })
    return newObj
})