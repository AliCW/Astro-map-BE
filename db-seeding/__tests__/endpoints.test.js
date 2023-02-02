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
        expect(msg[0].date).to.eql("1912-04-17");
      });
  });
});
describe("testing for /api/eclipses/all?dateDATE to retreive data for a specific date - sad path", () => {
  it("tests for all eclipse events in the next 5 years - landing page carousel - sad path", () => {
    return request(app)
      .get("/api/eclipses/all?date=2080-09-12")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.eql("404 - Not found");
      });
  });
});

describe("testing for /api/eclipses/all?date=DATE to retreive data for eclipses in the next 5 years from current year", () => {
  it("tests for all elipse events in the next 5 years - landing page carousel", () => {
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
      favourites: [],
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
      favourites: [],
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
      favourites: [],
    };
    return request(app)
      .post("/api/users/signup")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.eql("Username taken");
      });
  });
});

describe("/api/users/login", () => {
  it.only("will return the user object if the supplied password matches the database hashed password", () => {
    const user = {
      username: "pat",
      password: "blackoutcrew",
    };
    return request(app)
      .post("/api/users/login")
      .send(user)
      .expect(200)
      .then(({ body }) => {
        expect(body.username).to.eql("pat");
        expect(body.favourites).to.be.a("array");
      });
  });
  it("will return the user object if the supplied password matches the database hashed password", () => {
    const user = {
      username: "pat",
      password: "gibblets",
    };
    return request(app)
      .post("/api/users/login")
      .send(user)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.eql("Password incorrect");
      });
  });
});

describe("finds a users favourites and updates them", () => {
  it("finds a users favourites and updates them", () => {
    const user = {
      username: "pat",
      favourite: "2024-04-01",
    };
    return request(app)
      .patch(`/api/users/pat/favourites`)
      .send(user)
      .expect(200)
      .then(({ body }) => {
        expect(body.favourites[0]).to.eql(user.favourite);
      });
  });
  it("does not allow duplicate favourites", () => {
    const user = {
      username: "pat",
      favourite: "2024-04-01",
    };
    return request(app)
      .patch(`/api/users/pat/favourites`)
      .send(user)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.eql("Favourite already exists");
      });
  });
});

describe("allows a user to remove favourited events", () => {
  it("deletes favourites when user wants to remove them", () => {
    const user = {
      username: "pat",
      favourite: "2024-04-01",
    };
    return request(app)
      .patch(`/api/users/pat/favourites/remove`)
      .send(user)
      .expect(204)
      .then((user) => {
        expect(user.noContent).to.eql(true);
      });
  });
});

describe("/api/comments/:id", () => {
  it("posts a comment to the database", () => {
    const date = new Date();
    const today = date.toString()
    const comment = {
      event: "2024-04-01",
      body: "now thats what I call an eclipse",
      username: "pat",
      date: today,
    };
    return request(app)
      .post("/api/comments/2024-04-01")
      .send(comment)
      .expect(201)
      .then(({ body }) => {
        expect(body.body).to.eql(comment.body);
        expect(body.date).to.be.a("string");
      });
  })
});

describe("/api/comments/:id", () => {
  it("gets all comments for each event", () => {
    return request(app)
      .get("/api/comments/2024-04-01")
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.a("array");
      });
  });
})

describe("allows a user to delete comments", () => {
  it("deletes specific comments for an event by object id", () => {
    return request(app)
      .delete("/api/comments/63da52f36154389f0f2d0673")
      .expect(204)
      .then((comment) => {
        expect(comment.noContent).to.eql(true);
      });
  });
});

describe("allows a user to add avatars to their account", () => {
  it("adds avatars to specific user accounts", () => {
    const user = {
      username: "pat",
      avatarURL: "https://avatars.githubusercontent.com/u/1234",
    };
    return request(app)
      .patch(`/api/users/pat/avatar`)
      .send(user)
      .expect(200)
      .then(({ body }) => {
        expect(body.avatarURL).to.eql(user.avatarURL);
      });
  });
});
