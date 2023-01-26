// const { MongoClient } = require("mongodb");
// require('dotenv').config({
//     path: `${__dirname}/.env`,
//   });

// const url = process.env.MONGOURI;
// const client = new MongoClient(url);

// const dbName = "eclipses";

// function run() {
//     client.connect().then(() => {
//         console.log("Connected correctly to server");
//         const db = client.db(dbName);
//         return db.collection('annular').find().toArray();
//     }).then((result) => {
//         console.log(result, "result")
//     }).catch((err) => {
//             console.log(err.stack);
//     }).finally(() => {
//         client.close()
//     })
// }

//run()

const { ObjectID } = require("bson");
const mongoose = require("mongoose");
require("dotenv").config({
  path: `${__dirname}/.env`,
});

const connection = mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    //connecting to db
    console.log("you have connected");
    // const query = { type: 'annular' }
    // Sets up schema
    const Model = mongoose.model(
      "annulars",
      new mongoose.Schema({
        type: String,
        date: String,
        coordinateData: Array
      })
    );
    // Return response from db if it matches the schema
    return Model.find({});
  })
  .then((result) => {
    console.log(result, "result");
  })
  .catch((err) => {
    console.log(err, "Err");
  });

//mongoose.close()

// connects OK
// must find a way to end connection using mongoose
// look at async await notes
// get endpoints working first before hosting
