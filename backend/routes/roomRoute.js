import express from "express";
import AuthenticateToken from "../middlewares/authenticateToken.js";

import List from "../endpoints/room/list.js";
import Load from "../endpoints/room/load.js";
import Create from "../endpoints/room/create.js";
import Delete from "../endpoints/room/delete.js";

const router = express.Router();

router.get("/rooms", AuthenticateToken, List);
router.get("/room/:uri", AuthenticateToken, Load);
router.post("/rooms", AuthenticateToken, Create);
router.delete("/room/:uri", AuthenticateToken, Delete);

export default router;
