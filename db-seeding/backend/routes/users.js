const express = require("express");
const router = express.Router();
const {
  addUser,
  loginUser,
  addFavourite,
  removeFavourite,
  addAvatar,
} = require("../controllers/eventsController");

router.route("/signup").post(addUser);

router.route('/login').post(loginUser);

router.route('/:user/favourites').patch(addFavourite);

router.route('/:user/favourites/remove').patch(removeFavourite);

router.route('/:user/avatar').patch(addAvatar);


module.exports = router;