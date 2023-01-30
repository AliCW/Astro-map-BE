const asyncHandler = require("express-async-handler");
const { addFiveYears } = require('../../utils/add5Years');

const Eclipse = require("../models/eclipse-schema");

const getEvents = async (req, res) => {
  const events = await Eclipse.find({ type: "hybrid" });
  res.status(200).json(events);
};

const getEventsInNextFiveYears = async (req, res) => {
  if (Object.keys(req.params.date).length > 0){
    const {fiveYearsAhead, thisYear} = addFiveYears();
    const events = await Eclipse.find({ date: {
    $gte: thisYear,
    $lte: fiveYearsAhead,
  } });
  res.status(200).json(events);
  }
};

const getEventsById = async (req, res) => {
  if (Object.keys(req.query)[0] === 'date') { //<--query posed
    const events = await Eclipse.find({ date: "1912-04-17" })
    res.status(200).json(events)
  }
  const events = await Eclipse.find({ type: req.params.id })
  if (events.length === 0) {
    res.status(404).send({msg: '404 - Not found'})
  }
  res.status(200).json(events);
};


module.exports = {
  getEvents,
  getEventsById,
  getEventsInNextFiveYears,
};
