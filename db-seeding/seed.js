const { MongoClient } = require("mongodb");
const { convertArrayOfStringsToJson } = require('./convertArrayToJson')
const { hybridArrays } = require('./hybrid-arrays-all/hybrid-arrays-all')
const { totalArrays } = require('./total-arrays-all/total-arrays-all')
const { annularArrays } = require('./annular-arrays-all/annular-arrays')
require('dotenv').config({
  path: `${__dirname}/.env`,
});
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = process.env.MONGOURI;
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "eclipses";
 const totalEclipses = convertArrayOfStringsToJson(totalArrays, 'total')
 const annularEclipses = convertArrayOfStringsToJson(annularArrays, 'annular')
 const hybridEclipses = convertArrayOfStringsToJson(hybridArrays, 'hybrid')
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

        const total = db.collection("totals");

        await total.deleteMany({})
        const p = await total.insertMany(totalEclipses);
        const myDoc1 = await total.find();

        const annular = db.collection("annulars");
         
        await annular.deleteMany({})
        const q = await annular.insertMany(annularEclipses);
        const myDoc2 = await annular.find();
        
        const hybrid = db.collection("hybrids");
         
        await hybrid.deleteMany({})
        const r = await hybrid.insertMany(hybridEclipses);
        const myDoc = await hybrid.find();

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);