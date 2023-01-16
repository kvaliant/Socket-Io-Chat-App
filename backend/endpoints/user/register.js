import { AddUser } from "../../controllers/userController.js";

const Register = async (req, res) => {
  const userInput = req.body;
  let username = userInput["username"];
  let password = userInput["password"];

  var result = await AddUser(username, password);
  if (result.success) {
    res.status(200).json({ added: 1 });
  } else {
    res.status(500).send({ error: result.message });
  }
};

export default Register;
