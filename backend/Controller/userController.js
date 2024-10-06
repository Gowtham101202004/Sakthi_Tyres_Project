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
    res.status(405).json({ message: "Email already exists !" });
    return;
  }

  // Check if username is already taken
  const userNameExist = await UserModel.findOne({ name });
  if (userNameExist) {
    res.status(406).json({ message: "Username already taken !" });
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

const updateUserData=expressAsyncHandler(async(req,res)=>{
  const id=req.params.id;
  try{
    const user=await UserModel.findById(id);
    if(!user){
      return res.status(404).json({message:"User Not Found"});
    }
    const data=req.body;
    const updatedUser=await UserModel.findByIdAndUpdate(id, data, {new:true});
    res.status(200).json({message:"Profile updated",data:updatedUser});
  }
  catch(err){
    return res.status(500).json({message:err.message});
  }
})


const findUserAndUpdate=expressAsyncHandler(async(req,res)=>{
    const id=req.params.id;
    try{
      const user=await UserModel.findById(id);
      if(!user){
        return res.status(404).json({message:"User Not Found"});
    }
    res.json(user);
  }
  catch(err){
    return res.status(500).json({message:err.message});
  }
});

const updatePassword = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  console.log("Id -> ", id, " Password -> ", currentPassword, " New Password ->", newPassword);
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid current password!" });
    }

    user.password = newPassword;
    await user.save();
    console.log("Password updated!");
    return res.status(200).json({ message: "Password updated", data: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = {
  loginController,
  registerController,
  updateUserData,
  findUserAndUpdate,
  updatePassword,
};
