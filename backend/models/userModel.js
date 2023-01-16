import mongoose from "mongoose";

const User = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password_hashed: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model("Users", User);
