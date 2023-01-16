import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import { LoadDB } from "./config/loadDB.js";

import UserRoute from "./routes/userRoute.js";
import RoomRoute from "./routes/roomRoute.js";
import SocketRoute from "./routes/socketRoute.js";

dotenv.config();
LoadDB();

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", SocketRoute);
httpServer.listen(3002);

app.use(UserRoute);
app.use(RoomRoute);

app.listen(3001, () => console.log("Listening for requests"));
