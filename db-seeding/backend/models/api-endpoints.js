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
    ],
  };
};
