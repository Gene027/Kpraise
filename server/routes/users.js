import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, update); //verifyToken to validate who wants to update; this middleware fires whenever req is made on this route

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user to show his songs and details; anyone can see so no verifyToken
router.get("/find/:id", getUser);

//subscribe to a user
router.put("/sub/:id", verifyToken, subscribe); //id is id of channel we want to sub to 

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe); //id is id of channel to sub to

//like a video
router.put("/like/:audioId", verifyToken, like);

//dislike a video
router.put("/dislike/:audioId", verifyToken, dislike);

export default router;