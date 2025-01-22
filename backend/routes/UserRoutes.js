const Users = require("../controllers/User/user.js");

const UserRoutes = require("express").Router();

UserRoutes.route("/user").post(Users);
// UserRoutes.route("/user").post(Register);
// UserRoutes.route("/user").post(Register);
// UserRoutes.route("/user").post(Register);

module.exports = UserRoutes;
