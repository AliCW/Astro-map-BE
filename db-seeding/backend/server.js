const express = require("express");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/eclipses", require("./routes/eventRoutes"));

app.all("/*", (request, response, next) => {
  response.status(404).send({ msg: "404 - Not found" });
  next();
});

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));

module.exports = app;
