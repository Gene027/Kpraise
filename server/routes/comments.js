import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comments.js";
import {verifyToken} from "../verifyToken.js"

const router = express.Router();

router.post("/", verifyToken, addComment)

router.delete("/:id", verifyToken, deleteComment) //id of commentor

router.get("/:audioId", getComments)

export default router;