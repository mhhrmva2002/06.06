const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  basketItems: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
  
});
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (error, hash) => {
    this.password = hash;
    next();
  });
});
const User = mongoose.model("User", UserSchema);

module.exports = User;