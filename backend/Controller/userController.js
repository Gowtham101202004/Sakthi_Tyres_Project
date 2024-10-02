const generateToken = require("../Config/generateToken");
const UserModel = require("../Models/userModel");
const expressAsyncHandler = require("express-async-handler");

// Controller for User Login
const loginController = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;

  // Find user by name
  const user = await UserModel.findOne({ name });

  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    // Generate and return token upon successful login
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // Invalid credentials response
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Controller for User Registration
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    res.status(400).json({ message: "All input fields are required" });
    return;
  }

  // Check if user already exists by email
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    res.status(405).json({ message: "User already exists" });
    return;
  }

  // Check if username is already taken
  const userNameExist = await UserModel.findOne({ name });
  if (userNameExist) {
    res.status(406).json({ message: "Username already taken" });
    return;
  }

  // Create new user in the database
  const user = await UserModel.create({ name, email, password });
  
  // If user creation is successful, return user data with token
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Registration failed" });
  }
});

module.exports = {
  loginController,
  registerController,
};
