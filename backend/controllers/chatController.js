import Room from "../models/roomModel.js";
import Chat from "../models/chatModel.js";

export const AddChat = async (uri, content, user) => {
  var chat = new Chat();

  chat.content = content;
  chat.date = Date.now();
  chat.user = user;

  try {
    const addedChat = await chat.save();
    const updatedRoom = await Room.findOneAndUpdate({ uri: uri }, { $push: { chats: addedChat } });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
