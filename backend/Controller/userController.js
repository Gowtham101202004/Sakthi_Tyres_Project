const generateToken = require("../Config/generateToken");
const UserModel = require("../Models/userModel");
const expressAsyncHandler = require("express-async-handler");

// Login
const loginController = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, password } = req.body;

  const user = await UserModel.findOne({ name });

  if (user && (await user.matchPassword(password))) {
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
    console.log(response);
    res.json(response);
  } else {
    res.status(401).json({ message: "Invalid UserName or Password" });
  }
});

// Registration
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check for all fields
  if (!name || !email || !password) {
    res.status(400).json({ message: "All necessary input fields have not been filled" });
    return;
  }

  // Pre-existing user
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    res.status(405).json({ message: "User already exists" });
    return;
  }

  // UserName already taken
  const userNameExist = await UserModel.findOne({ name });
  if (userNameExist) {
    res.status(406).json({ message: "UserName already taken" });
    return;
  }

  // Create an entry in the db
  const user = await UserModel.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Registration Error" });
  }
});

module.exports = {
  loginController,
  registerController,
};
