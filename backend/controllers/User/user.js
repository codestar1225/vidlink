const User = require("../../models/UsersModel");
const expressAsyncHandler = require("express-async-handler");

const Users = expressAsyncHandler(async (req, res) => {
  const { name, age, location } = await req.body;

  try {
    const user = await User.create({
      name,
      age,
      location,
    });
    console.log("Server Okay");

    res.json({ message: "User saved successfully!" });
  } catch (error) {
    res.json({ message: "Error saving user data", error: error.message });
  }
});
module.exports = Users;
