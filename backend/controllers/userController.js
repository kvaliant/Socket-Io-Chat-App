import User from "../models/userModel.js";
import * as bcrypt from "bcrypt";

export const GetUser = async (username) => {
  try {
    const user = await User.findOne({ username: username }).populate("password_hashed");
    return { success: true, user: user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const AddUser = async (username, password) => {
  var user = new User();

  user.username = username;

  let salt = await bcrypt.genSalt(5);
  user.password_hashed = await bcrypt.hash(password, salt);

  try {
    const addedUser = await user.save();
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
