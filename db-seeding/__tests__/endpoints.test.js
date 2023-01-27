// const { getEvents } = require('../backend/controllers/eventsController')
// const app = require('../app')
const request = require("supertest");
const { runSeed } = require('../seed');
const { expect } = require('chai');
const Eclipse = require("../backend/models/eclipse-schema");
const fs = require('fs/promises')
const { testData } = require('../testData/testData.js')
const { hybridArrays } = require('../data/hybrid-arrays-all/hybrid-arrays-all')
const { totalArrays } = require('../data/total-arrays-all/total-arrays-all')
const { annularArrays } = require('../data/annular-arrays-all/annular-arrays')
const { convertArrayOfStringsToJson } = require('../utils/convertArrayToJson')


describe("Tests with beforeEach", function () {
  beforeEach(function () {
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


const smallArraysSchema = [allArraysSchema[0], allArraysSchema[10], allArraysSchema[27], allArraysSchema[100], allArraysSchema[130], allArraysSchema[201]]
        
         runSeed(smallArraysSchema);
         console.log("seed ran");
  });
  
  it('should have a key of key', () => {
      const string = "two"
      expect(string).to.have.lengthOf(3);
      console.log('string')
    })
    afterEach(function () {
        test.collection.drop()
        console.log("deleted database")
    })
}
)

