const express = require("express");
const router = express.Router();
const {
    postComment
} = require("../controllers/eventsController");

// router.route("/:id").get(getCommentsByEvent);

router.route("/:id").post(postComment);

// router.route("/:id").delete(deleteCommentByEvent);



module.exports = router;
