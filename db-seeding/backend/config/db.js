const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `${__dirname}/../../../.env.${ENV}`,
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI);
    console.log(`mongo db connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
