const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Create a new schema for our eclipse data
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
});

// hash the password
userSchema.methods.generateHash = function(password) {
    bcrypt.hash(password, 10)};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Create a mongoose model based on the above schema
const User = mongoose.model("User", userSchema);

// export the model
module.exports = User;
