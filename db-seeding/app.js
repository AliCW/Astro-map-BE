const mongoose = require('mongoose')
require('dotenv').config({
    path: `${__dirname}/.env`,
  });

const connection = mongoose.createConnection(process.env.MONGOURI);
const query = { type: 'annular' }
const Model = connection.model('EclipsesCluster.annular', new mongoose.Schema({ date: String, type: String, }));
// Works
const queryResult = Model.find(query, function(error, result) { 
    if (error) {
        console.log(error)
    }
})

const queryLog = async () => {
    await console.log(queryResult)
}

queryLog()

connection.close()

