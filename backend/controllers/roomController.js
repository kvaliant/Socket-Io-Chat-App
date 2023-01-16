import Room from "../models/roomModel.js";
import Chat from "../models/chatModel.js";

export const GetRooms = async () => {
  try {
    const rooms = await Room.find().populate("owner");

    return { success: true, rooms: rooms };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const GetRoom = async (uri) => {
  try {
    // const chat = await Chat.find();

    const room = await Room.findOne({ uri: uri }).populate({ path: "chats", populate: { path: "user" } });
    if (room === null) {
      return { success: false, message: "Room not found" };
    }

    return { success: true, room: room };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const AddRoom = async (uri, name, user) => {
  var room = new Room();

  room.uri = uri;
  room.name = name;
  room.owner = user;

  try {
    const addedRoom = await room.save();
    return { success: true, uri: room.uri };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
