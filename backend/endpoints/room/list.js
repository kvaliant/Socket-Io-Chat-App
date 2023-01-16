import { GetRooms } from "../../controllers/roomController.js";

const List = async (req, res) => {
  var result = await GetRooms();
  if (result.success) {
    res.status(200).json({ rooms: result.rooms });
  } else {
    res.status(500).json({ message: result.message });
  }
};

export default List;
