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
//         return db.collection('annular').find({date: '2035Mar09'}).toArray();
//     }).then((result) => {
//         console.log(result)
//     }).catch((err) => {
//             console.log(err.stack);
//     }).finally(() => {
//         client.close()
//     })
// }

// run()

const { ObjectID } = require('bson');
const mongoose = require('mongoose')
require('dotenv').config({
    path: `${__dirname}/.env`,
  });

mongoose.connect(process.env.MONGOURI)
.then(() => {
    console.log('connected to server')
})
.catch((err) => {
    console.log(err)
})

const Model = mongoose.model('Hybrid', new mongoose.Schema({}));

Model.find({type: 'hybrid'}).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })

// const queryResult = 


// gimme()


