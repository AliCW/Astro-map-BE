const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventsById,
  getEventsInNextFiveYears,
} = require("../controllers/eventsController");

router.route("/").get(getEvents);

router.route("/:id").get(getEventsById);

router.route("/all/:date").get(getEventsInNextFiveYears);



module.exports = router;
