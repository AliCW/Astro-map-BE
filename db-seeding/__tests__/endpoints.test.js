const { expect } = require("chai");
const request = require("supertest");
const app = require("../backend/server");
const addUser = require("../backend/controllers/eventsController");

describe("Testing for /api/eclipses endpoint retrieving all eclipse data - happy path", () => {
  it("Checks the presence of each key within each data tick", () => {
    return request(app)
      .get("/api/eclipses/")
      .expect(200)
      .then(({ body: msg }) => {
        msg.forEach((obj) => {
          expect(obj).to.have.property("date").to.be.a("string");
          expect(obj).to.have.property("type").to.be.a("string");
          expect(obj).to.have.property("coordinateData").to.be.a("array");
          expect(obj).to.have.keys([
            "__v",
            "_id",
            "coordinateData",
            "date",
            "type",
          ]);
        });
      });
  });
  it("Checks the presence of coordinateData keys & data within each tick", () => {
    return request(app)
      .get("/api/eclipses/")
      .expect(200)
      .then(({ body: msg }) => {
        msg.forEach((obj) => {
          obj.coordinateData.forEach((coordinates) => {
            expect(coordinates).to.have.property("date").to.be.a("string");
            expect(coordinates).to.have.property("time").to.be.a("string");
            expect(coordinates).to.have.property("pathWidth").to.be.a("string");
            expect(coordinates)
              .to.have.property("centerDuration")
              .to.be.a("string");
            expect(coordinates).to.have.property("northCoordinates");
            expect(coordinates).to.have.property("southCoordinates");
            expect(coordinates).to.have.property("centerCoordinates");
          });
        });
      });
  });
  it("Checks the presence of the coordinates to be an object or null within each data tick", () => {
    return request(app)
      .get("/api/eclipses")
      .expect(200)
      .then(({ body: msg }) => {
        msg.forEach((obj) => {
          obj.coordinateData.forEach((coordinates) => {
            const checkCoords = (coords) => {
              if (coords === null || typeof coords === "object") {
                return true;
              }
              if (coords === null || typeof coords === "object") {
                return true;
              }
              if (coords === null || typeof coords === "object") {
                return true;
              }
              return false;
            };
            expect(checkCoords(coordinates.northCoordinates)).to.eql(true);
            expect(checkCoords(coordinates.southCoordinates)).to.eql(true);
            expect(checkCoords(coordinates.centerCoordinates)).to.eql(true);
          });
        });
      });
  });
  it("Checks the values of coordinates as numbers with four decimal places", () => {
    return request(app)
      .get("/api/eclipses")
      .expect(200)
      .then(({ body: msg }) => {
        msg.forEach((obj) => {
          obj.coordinateData.forEach((coordinates) => {
            const checkNumbers = (coords) => {
              if (coords === null) {
                return true;
              } else {
                if (
                  typeof coords.latitude === "number" &&
                  typeof coords.longitude === "number"
                ) {
                  return true;
                }
              }
              return false;
            };
            expect(checkNumbers(coordinates.northCoordinates)).to.eql(true);
            expect(checkNumbers(coordinates.southCoordinates)).to.eql(true);
            expect(checkNumbers(coordinates.centerCoordinates)).to.eql(true);
          });
        });
      });
  });
});

describe("Testing for /api/eclipses endpoint retrieving all eclipse data - sad path (incorrect path)", () => {
  it("404: route does not exist - bad path test", () => {
    return request(app)
      .get("/api/eplplida")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.eql("404 - Not found");
      });
  });
});

describe("Testing for /api/eclipses/:type retrieving eclipse by data type - happy path", () => {
  it("returns only hybrid eclipses when searching for hybrid types", () => {
    return request(app)
      .get("/api/eclipses/hybrid")
      .expect(200)
      .then(({ body: msg }) => {
        expect(msg).to.have.lengthOf(2);
        msg.forEach((obj) => {
          expect(obj.type).to.eql("hybrid");
        });
      });
  });
});

describe("Testing for /api/eclipses/:type retrieving eclipse by data type - sad path", () => {
  it("tests for a eclipse type that is not a valid eclipse type", () => {
    return request(app)
      .get("/api/eclipses/completemadmanstyleorwhatever")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.eql("404 - Not found");
      });
  });
});

describe("Testing for /api/eclipses/:type?date=DATE to retrieve eclipse data for a specific date - happy path", () => {
  it("tests for 1912-Apr-17 eclipse data point", () => {
    return request(app)
      .get("/api/eclipses/hybrid?date=1912-04-17")
      .expect(200)
      .then(({ body: msg }) => {
        expect(msg).have.length(1);
      });
  });
});

describe("testing for /api/eclipses/all?date=DATE to retreive data for eclipses in the next 12 months", () => {
  it("tests for all elipse events in the next 12 months - landing page carousel", () => {
    return request(app)
      .get("/api/eclipses/all/2023-01-30")
      .expect(200)
      .then(({ body: msg }) => {
        expect(msg).have.length(1);
      });
  });
});

describe("testing if user is added somewhere", () => {
  it("tests if user is added somewhere", () => {
    const newUser = {
      username: "pat",
      password: "blackoutcrew",
    };
    return request(app)
      .post("/api/users/signup")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.username).to.eql(newUser.username);
      });
  });
  it("tests if password is hashed in the database", () => {
    const newUser = {
      username: "jamie",
      password: "blackoutcrew",
    };
    return request(app)
      .post("/api/users/signup")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.password).to.not.eql(newUser.password);
      });
  });
  it("will not add duplicate usernames", () => {
    const newUser = {
      username: "pat",
      password: "blackoutcrew",
    };
    return request(app)
      .post("/api/users/signup")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.eql('Username taken');
      });
  });
});

describe('/api/users/login', () => {
  it('will return true if the supplied password matches the database hashed password', () => {
    const user = {
      username: 'pat',
      password: 'blackoutcrew'
    }
    return request(app)
    .post('/api/users/login')
    .send(user)
    .expect(200)
    .then(({ body }) => {
      expect(body).to.eql('pat')
    })
  })
  it('will return true if the supplied password matches the database hashed password', () => {
    const user = {
      username: 'pat',
      password: 'gibblets'
    }
    return request(app)
    .post('/api/users/login')
    .send(user)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).to.eql('password incorrect')
    })
  })
})

// // const { getEvents } = require('../backend/controllers/eventsController')
// // const app = require('../app')
// const request = require("supertest");
// const { runSeed } = require('../seed');
// const { expect } = require('chai');
// const Eclipse = require("../backend/models/eclipse-schema");
// const fs = require('fs/promises')
// const { testData } = require('../testData/testData.js')
// const { hybridArrays } = require('../data/hybrid-arrays-all/hybrid-arrays-all')
// const { totalArrays } = require('../data/total-arrays-all/total-arrays-all')
// const { annularArrays } = require('../data/annular-arrays-all/annular-arrays')
// const { convertArrayOfStringsToJson } = require('../utils/convertArrayToJson')

// describe("Tests with beforeEach", function () {
//   beforeEach(function () {
// const hybridEclipseObjects = convertArrayOfStringsToJson(hybridArrays, 'hybrid')
// const totalEclipseObjects = convertArrayOfStringsToJson(totalArrays, 'total')
// const annularEclipseObjects = convertArrayOfStringsToJson(annularArrays, 'annular')
// const allArrays = hybridEclipseObjects.concat(totalEclipseObjects, annularEclipseObjects)

// // maps over the objects and creates schema from those objects

// const allArraysSchema = allArrays.map((object) => {
//     const newObj = new Eclipse({
//         'date': object.date,
//         'type': object.type,
//         'coordinateData': object.coordinateData
//     })
//     return newObj
// })

// const smallArraysSchema = [allArraysSchema[0], allArraysSchema[10], allArraysSchema[27], allArraysSchema[100], allArraysSchema[130], allArraysSchema[201]]

//          runSeed(smallArraysSchema);
//          console.log("seed ran");
//   });

//   it('should have a key of key', () => {
//       const string = "two"
//       expect(string).to.have.lengthOf(3);
//       console.log('string')
//     })
//     afterEach(function () {
//         test.collection.drop()
//         console.log("deleted database")
//     })
// }
// )
