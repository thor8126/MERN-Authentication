import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    default: "User",
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profileImage: {
    type: String,
    default:
      "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",
  },
  token: {
    type: String,
    default: null,
  },
  tokenExpiration: {
    type: Date,
    default: null,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;