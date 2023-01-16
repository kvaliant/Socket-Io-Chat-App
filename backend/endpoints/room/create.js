import { AddRoom } from "../../controllers/roomController.js";
import { randomBytes } from "crypto";

const Create = async (req, res) => {
  const userInput = req.body;
  let name = userInput["name"];

  let uri = randomBytes(5).toString("hex");
  let user = req.user.user;

  var result = await AddRoom(uri, name, user);
  if (result.success) {
    res.status(200).json({ added: 1, uri: uri });
  } else {
    res.status(500).json({ error: result.message });
  }
};

export default Create;
