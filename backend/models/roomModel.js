import mongoose from "mongoose";
import User from "./userModel.js";

const Room = mongoose.Schema({
  uri: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

export default mongoose.model("Rooms", Room);
