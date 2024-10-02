const express = require("express");
const {
  loginController,
  registerController,
} = require("../Controller/userController");

const {
  cartyre_insert,
  cartyre_display,
} = require("../Controller/cartyreController");

const {
  addToCart,
  getCartItems,
  removeFromCart
} = require('../Controller/cartController');

const { protect } = require("../middleware/authMiddleware");

const Router = express.Router();

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.post("/cardata", cartyre_insert);
Router.get("/displaycardata", cartyre_display);

// Cart Routes
Router.post("/cart", protect, addToCart);          // Add item to cart
Router.get("/cart", protect, getCartItems);        // Get user's cart
Router.delete("/cart", protect, removeFromCart);   // Remove item from cart

module.exports = Router;
