import mongoose from "mongoose";
import Users from "./userModel.js";

const Chat = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Users,
    required: true,
  },
});

export default mongoose.model("Chats", Chat);
