const express = require("express");
const {
  loginController,
  registerController,
} = require("../Controller/userController");

const {
  cartyre_insert,
  cartyre_display
} = require("../Controller/cartyreController");

const { protect } = require("../middleware/authMiddleware");

const Router = express.Router();

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.post("/cardata", cartyre_insert);
Router.get("/displaycardata", cartyre_display);

module.exports = Router;