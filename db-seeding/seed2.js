const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Hybrid = require('./eclipse-schema')
const { convertArrayOfStringsToJson } = require('./convertArrayToJson')
const { hybridArrays } = require('./hybrid-arrays-all/hybrid-arrays-all')
const { totalArrays } = require('./total-arrays-all/total-arrays-all')
const { annularArrays } = require('./annular-arrays-all/annular-arrays')
require('dotenv').config({
        path: `${__dirname}/.env`,
      });

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to server')
    return hybridEclipses.insertMany()
}).then(() => {
    console.log('saved to database')
}).catch((err) => {
    console.log(err)
})

// const hybridEclipses = convertArrayOfStringsToJson(hybridArrays, 'hybrid')

const hybridEclipses = new Hybrid(convertArrayOfStringsToJson(hybridArrays))
console.log(hybridEclipses.date)


// Hybrid.save(hybridEclipses).then(() => {
//     console.log('data inserted')
// }).catch((err) => {
//     console.log(err, 'error')
// }).finally(() => {
//     mongoose.connection.close()
// })


