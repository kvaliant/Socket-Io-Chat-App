import { AddChat } from "../controllers/chatController.js";
import AuthenticateSocket from "../middlewares/authenticateSocket.js";

const SocketRoute = (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("join_room", (uri) => {
    console.log(`join_room: ${uri}`);
    socket.join(uri);
  });

  socket.on("send_message", (data) => {
    AuthenticateSocket(data, (data) => {
      AddChat(data.room, data.content, data.user.user);
      data.user = { username: data.user.user.username };
      data.date = new Date();
      socket.to(data.room).emit("receive_message", data);
    });
  });
};

export default SocketRoute;
