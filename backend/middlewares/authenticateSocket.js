import * as jwt from "jsonwebtoken";

const AuthenticateSocket = (data, next) => {
  const authHeader = data.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  delete data.headers;

  if (token == null) {
    console.log("Missing auth token");
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    data.user = user;
    next(data);
  });
};

export default AuthenticateSocket;
