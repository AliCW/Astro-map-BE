const mongoose = require("mongoose");

// Create a new schema for our eclipse data
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
});

// Create a mongoose model based on the above schema
const Comment = mongoose.model("Comment", commentSchema);

// export the model
module.exports = Comment;
