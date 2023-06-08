import express from 'express';
import { googleAuth, signin, signup, verifyUser, signout } from '../controllers/auth.js';
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//CREATE USER
router.post("/signup", signup)

//SIGN IN
router.post("/signin", signin)

//SIGN OUT
router.get("/signout", signout)

//GOOGLE AUTH
router.post("/google", googleAuth)

//VERIFY SESSION
router.get("/", verifyToken, verifyUser)

export default router;