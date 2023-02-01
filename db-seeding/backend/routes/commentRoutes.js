const express = require("express");
const router = express.Router();
const {
    postComment,
    getCommentsByEventId,
    deleteCommentByEvent
} = require("../controllers/eventsController");

router.route("/:id").get(getCommentsByEventId);

router.route("/:id").post(postComment);

router.route("/:id").delete(deleteCommentByEvent);



module.exports = router;
