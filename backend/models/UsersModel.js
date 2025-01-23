const mongoose = require("mongoose");
const UsersModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Name is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
});

const User = mongoose.model("User", UsersModel);
module.exports = User;
