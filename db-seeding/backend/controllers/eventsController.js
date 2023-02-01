const asyncHandler = require("express-async-handler");
const { addFiveYears } = require("../../utils/add5Years");
const bcrypt = require("bcrypt");

const Eclipse = require("../models/eclipse-schema");

const User = require("../models/user-schema");

const Comment = require("../models/comment-schema");

const getEvents = async (req, res) => {
  const events = await Eclipse.find({});
  res.status(200).json(events);
};

const getEventsById = async (req, res) => {
  if (Object.keys(req.query)[0] === "date") {
    //<--query posed
    const events = await Eclipse.find({ date: req.query.date });
    if (events.length === 0) {
      res.status(404).send({ msg: "404 - Not found" });
    }
    res.status(200).json(events);
  }
  const events = await Eclipse.find({ type: req.params.id });
  if (events.length === 0) {
    res.status(404).send({ msg: "404 - Not found" });
  }
  res.status(200).json(events);
};

const getEventsInNextFiveYears = async (req, res) => {
  if (Object.keys(req.params.date).length > 0) {
    const { fiveYearsAhead, thisYear } = addFiveYears();
    const events = await Eclipse.find({
      date: {
        $gte: thisYear,
        $lte: fiveYearsAhead,
      },
    });

    res.status(200).json(events);
  }
};

const addUser = (req, res) => {
  User.find({ username: req.body.username })
    .then((user) => {
      if (user.length > 0) {
        throw "400";
      }
    })
    .then(() => {
      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        favourites: [],
      });
      user.password = hash;
      return user;
    })
    .then((user) => {
      return user.save();
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      if (err === "400") {
        res.status(400).json({ msg: "Username taken" });
      } else res.status(500);
    });
};

const loginUser = (req, res) => {
  User.find({ username: req.body.username })
    .then((user) => {
      const bool = bcrypt.compareSync(req.body.password, user[0].password);
      if (bool === true) {
        res.status(200).json(user[0]);
      } else {
        res.status(400).json({ msg: "Password incorrect" });
      }
    })
    .catch((err) => {
      return err;
    });
};

const addFavourite = (req, res) => {
  return User.find({ username: req.body.username })
    .then((user) => {
      const favourites = req.body.favourite;
      if (user[0].favourites.includes(favourites)) {
        throw "400";
      }
      return User.findOneAndUpdate(
        { username: req.body.username },
        { favourites: [favourites, ...user[0].favourites] },
        { new: true }
      );
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err === "400") {
        res.status(400).json({ msg: "Favourite already exists" });
        console.log(err);
      }
    });
};

const removeFavourite = (req, res) => {
  return User.find({ username: req.body.username })
    .then((user) => {
      const favourites = user[0].favourites;
      const newFavourites = favourites.filter((favourite) => {
        if (favourite !== req.body.favourite) {
          return favourite;
        }
      });
      return User.findOneAndUpdate(
        { username: req.body.username },
        { favourites: newFavourites },
        { new: true }
      );
    })
    .then((user) => {
      res.status(204);
      res.send(user);
    });
};

const postComment = (req, res) => {
  return User.find({ username: req.body.username })
    .then((user) => {
      if (user.length === 0) {
        throw "404";
      }
      const comment = new Comment({
        username: req.body.username,
        body: req.body.body,
        event: req.body.event,
      });
      return comment.save();
    })
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      if (err === "404") {
        res.status(404).json({ msg: "User not found" });
      }
    });
};

const getCommentsByEventId = async (req, res) => {
  return Comment.find({ event: req.params.id }).then((comments) => {
    res.status(200).json(comments);
  });
};

const deleteCommentByEvent = (req, res) => {
  return Comment.deleteOne({ _id: req.params.id }).then((obj) => {
    res.status(204);
    res.send(obj);
  });
};

module.exports = {
  getEvents,
  getEventsById,
  getEventsInNextFiveYears,
  addUser,
  loginUser,
  addFavourite,
  removeFavourite,
  postComment,
  getCommentsByEventId,
  deleteCommentByEvent,
};
