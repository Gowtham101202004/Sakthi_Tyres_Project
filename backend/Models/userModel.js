const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // Corrected typo
    },
    email: {
      type: String,
      required: true,  // Corrected typo
    },
    password: {
      type: String,
      required: true,  // Corrected typo
    },
  },
  {
    timestamps: true,  // Corrected typo
  }
);

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {  // Corrected condition
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();  // Call next() to proceed with the save operation
});

const User = mongoose.model("users", userModel);
module.exports = User;
