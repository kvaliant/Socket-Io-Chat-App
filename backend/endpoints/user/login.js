import { GetUser } from "../../controllers/userController.js";
import jsonwebtoken from "jsonwebtoken";
import * as bcrypt from "bcrypt";

const Login = async (req, res) => {
  const userInput = req.body;
  var username = userInput["username"];
  var password = userInput["password"];
  var result = await GetUser(username);

  if (!result.success) {
    res.status(404).json({ error: result.message });
    return;
  }

  let passwordValid = await bcrypt.compare(password, result.user.password_hashed);
  if (!passwordValid) {
    console.log(`${password} compared to user's ${result.user.password_hashed}`);
    res.status(403).json({ error: "Invalid password" });
    return;
  }

  let user = {
    user: result.user,
  };
  const accessToken = jsonwebtoken.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "2d" });

  res.status(200).json({ accessToken: accessToken });
};

export default Login;
