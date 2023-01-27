// const { getEvents } = require('../backend/controllers/eventsController')
// const app = require('../app')
// const runSeed = require('./seed');
const request = require("supertest");
const runSeed = require('../seed')
const testData = require('../testData/testData')
const { expect } = require('chai')



describe("Tests with beforeEach", function () {
  beforeEach(function () {
    // runSeed(JSON.parse(testData))
  });
  
  it('should have a key of key', () => {
      const string = "two"
      expect(string).to.have.lengthOf(3);
      console.log('string')
    })
}
)
    
// afterAll(() => {
//     if (db.end) {
//       return db.end();
//     }
//   });
//   beforeEach(() => seed(testData));

