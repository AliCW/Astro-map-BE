const apiEndpoints = () => {
  const endpoints = {
    GET: [
      {
        "/api/eclipses": {
          path: "GET /api/eclipses",
          description:
            "lists all the eclipse data for the center shadow stretching from 1900-2100",
          queries: [],
        },
      },
      {
        "/api/eclipses/:type": {
          path: "GET /api/eclipses/:type",
          description: "filters eclipse data by type; annual, total, hybrid",
          queries: [
            "/api/eclipses/hybrid",
            "/api/eclipses/total",
            "/api/eclipses/annular",
          ],
        },
      },
      {
        "/api/eclipses/:type?date=DATE": {
          path: "GET /api/eclipses/:type?date=DATE",
          description:
            "filters eclipse data by type & date, date input must be specific, type can be non-specific.",
          queries: [
            "/api/eclipses/all?date=2050-05-20",
            "/api/eclipses/hybrid?date=2050-05-20",
            "/api/eclipses/total?date=1911-04-28",
            "/api/eclipses/annular?date=1958-04-19",
          ],
        },
      },
      {
        "/api/eclipses/all/:date": {
          path: "GET /api/eclipses/all/:date",
          description: `finds eclipse events in the next five years
                            :date is auto added by backend functionality & the query will not impact the result`,
          queries: [
            "/api/eclipses/all/2014-05-12",
            "/api/eclipses/all/1980-06-05",
            "/api/eclipses/all/2080-04-03",
          ],
        },
      },
      {
        "/api/comments/:id": {
          path: "GET /api/comments/:id",
          description: "lists all comments by event date id",
          queries: ["/api/comments/2024-04-01"],
        },
      },
    ],
    POST: [
      {
        "/api/users/signup": {
          path: "POST /api/users/signup",
          description:
            "allows users to sign up, passwords are hashed serverside, duplicate usernames are not allowed",
          queries: [],
          examplePost: { username: "pat", password: "blackoutcrew" },
        },
      },
      {
        "/api/users/login": {
          path: "POST /api/users/login",
          description:
            "allows users to login, compares user input to decrypted hash",
          queries: [],
          examplePost: { username: "pat", password: "blackoutcrew" },
        },
      },
      {
        "/api/comments/:id": {
          path: "POST /api/comments/:id",
          description: "allows users to post a comment by event date id",
          queries: ["/api/comments/2024-04-01"],
          examplePost: {event: "2024-04-01",
                        body: "now thats what I call an eclipse",
                        username: "pat",}
        },
      },
    ],
    PATCH: [
      {
        "/api/users/:user/favourites": {
          path: "PATCH /api/users/:user/favourites",
          description:
           "allows users to add a favourite event by date ID, returns a 400 error if the user already exists",
           queries: ["/api/users/pat/favourites",
                    "/api/users/jamie/favourites",
                    "/api/users/ali/favourites"],
           examplePatch: { username: "pat", favourite: "2024-04-01" }
        },
      },
      {
        "/api/users/:user/favourites/remove": {
          path: "PATCH /api/users/:user/favourites/remove",
          description: "allows users to remove a favourite event by date ID",
          queries: ["/api/users/pat/favourites/remove",
                    "/api/users/ali/favourites/remove",
                    "/api/users/jamie/favourites/remove",],
          examplePatch: { username: "pat", favourite: "2024-04-01" },
        },
      },
    ],
    DELETE: [
      {
        "/api/comments/:id": {
          path: "DELETE /api/comments/:id",
          description: "delete comment by mongo hexideciaml id",
          queries: ["/api/comments/63da52f36154389f0f2d0673"],
        },
      },
    ]
  };
};