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

//mongoose.close()

// connects OK
// must find a way to end connection using mongoose
// look at async await notes
// get endpoints working first before hosting
