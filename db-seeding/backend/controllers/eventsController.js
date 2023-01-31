const asyncHandler = require("express-async-handler");
const { addFiveYears } = require('../../utils/add5Years');
const bcrypt = require("bcrypt");

const Eclipse = require("../models/eclipse-schema");

const User = require('../models/user-schema');

const getEvents = async (req, res) => {
  const events = await Eclipse.find({ type: "hybrid" });
  res.status(200).json(events);
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

const addUser = (req, res) => {
  const user = new User({ 
    username: req.body.username,
  });
   bcrypt.hash(req.body.password, 10).then((hash) => {
    user.password = hash;
    return user;
   })
  .then((user) => {
    return user.save()
  })
  .then((result) => {
      res.status(201).json(result);
    })
  .catch((err) => {
      res.status(500).json(err);
    });
  }

const loginUser = (req, res) => {

}

module.exports = {
  getEvents,
  getEventsById,
  getEventsInNextFiveYears,
  addUser,
  loginUser
};
