import express from "express";
import Login from "../endpoints/user/login.js";
import Register from "../endpoints/user/register.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);

export default router;
