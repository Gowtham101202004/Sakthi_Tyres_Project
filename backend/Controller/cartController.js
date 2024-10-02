const { CartModel } = require('../Models/cartModel');
const expressAsyncHandler = require('express-async-handler');

// Add item to cart
const addToCart = expressAsyncHandler(async (req, res) => {
  const { tyre_model, tyre_size, tyre_brand, image, price } = req.body;

  // Check if cart exists for the user
  let cart = await CartModel.findOne({ user: req.user._id });

  if (cart) {
    // Check if the item already exists in the cart
    const itemExists = cart.items.find(item => item.tyre_model === tyre_model && item.tyre_brand === tyre_brand);

    if (itemExists) {
      res.status(400).json({ message: "Item already in cart" });
    } else {
      // Add item to cart
      cart.items.push({ tyre_model, tyre_size, tyre_brand, image, price });
      await cart.save();
      res.status(200).json({ message: "Item added to cart", cart });
    }
  } else {
    // Create a new cart for the user
    const newCart = new CartModel({
      user: req.user._id,
      items: [{ tyre_model, tyre_size, tyre_brand, image, price }]
    });
    await newCart.save();
    res.status(200).json({ message: "Cart created and item added", newCart });
  }
});

// Get cart items for the logged-in user
const getCartItems = expressAsyncHandler(async (req, res) => {
  const cart = await CartModel.findOne({ user: req.user._id });

  if (cart) {
    res.status(200).json(cart.items);
  } else {
    res.status(404).json({ message: "Cart is empty" });
  }
});

// Remove an item from the cart
const removeFromCart = expressAsyncHandler(async (req, res) => {
  const { tyre_model, tyre_brand } = req.body;

  // Find the user's cart
  const cart = await CartModel.findOne({ user: req.user._id });

  if (cart) {
    // Filter out the item to be removed
    cart.items = cart.items.filter(
      item => !(item.tyre_model === tyre_model && item.tyre_brand === tyre_brand)
    );
    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

module.exports = { addToCart, getCartItems, removeFromCart };
