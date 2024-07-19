const { Schema, model } = require("mongoose");

const user_schema = new Schema(
  {
    full_name: String,
    username: {
      type: String,
      required: [true, "username is required!"],
      unique: [true, "username already exist!"],
      lowercase: true,
      trim: true,
    },
    phone_number: {
      type: String,
      required: [true, "phone_number is required!"],
      unique: [true, "phone_number already exist!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: [true, "email already exist!"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required!"],
      minLength: 8,
    },

    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    login_count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const user_model = model("user_profiles", user_schema);

module.exports = user_model;
