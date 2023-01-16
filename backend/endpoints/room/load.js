import { GetRoom } from "../../controllers/roomController.js";

const Load = async (req, res) => {
  const userInput = req.params;
  let uri = userInput["uri"];

  var result = await GetRoom(uri);
  if (result.success) {
    res.status(200).json({ room: result.room });
  } else {
    res.status(500).json({ error: result.message });
  }
};

export default Load;
