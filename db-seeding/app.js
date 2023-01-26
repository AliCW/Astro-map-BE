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


