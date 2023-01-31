const express = require("express");
const router = express.Router();
const {
  addUser
} = require("../controllers/eventsController");

router.route("/signup").post(addUser);

module.exports = router;