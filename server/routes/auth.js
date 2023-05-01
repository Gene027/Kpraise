import express from 'express';
import { signin, signup, verifyUser, signout } from '../controllers/auth.js';
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//CREATE USER
router.post("/signup", signup)

//SIGN IN
router.post("/signin", signin)

//SIGN OUT
router.get("/signout",verifyToken, signout)

//GOOGLE AUTH
router.post("/google",)

//VERIFY SESSION
router.get("/", verifyToken, verifyUser)

export default router;