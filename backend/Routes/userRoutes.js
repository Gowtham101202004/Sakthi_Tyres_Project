const express = require("express");
const {
  loginController,
  registerController,
  updateUserData,
  findUserAndUpdate,
  updatePassword
} = require("../Controller/userController");

const {
  tyre_insert,
  tyre_display,
} = require("../Controller/tyreController");

const {
  addToCart,
  getCartItems,
  removeFromCart
} = require('../Controller/cartController');

const {
  createPaymentIntent,
} = require('../Controller/paymentController');

const { protect } = require("../middleware/authMiddleware");

const Router = express.Router();

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.put("/update-profile/:id", updateUserData);
Router.get("/get-user-info/:id",findUserAndUpdate);
Router.put("/update-password/:id",updatePassword);

//Tyre Data
Router.post("/tyredata", tyre_insert);
Router.get("/displaytyredata", tyre_display);

//Cart Routes
Router.post("/cart", protect, addToCart);          // Add item to cart
Router.get("/cart", protect, getCartItems);        // Get user's cart
Router.delete("/cart", protect, removeFromCart);   // Remove item from cart

//Payment
Router.post("/create-payment-intent",createPaymentIntent);

module.exports = Router;
