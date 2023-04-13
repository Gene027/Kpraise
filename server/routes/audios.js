import express from "express";
import { addAudio, addView, getByTag, getAudio, random, search, sub, trend } from "../controllers/audio.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create an audio
router.post("/", verifyToken, addAudio)

router.put("/:id", verifyToken, addAudio)

router.delete("/:id", verifyToken, addAudio)

router.get("/find/:id", getAudio)

router.put("/view/:id", addView) //increase views on video id

router.get("/trend", trend)

router.get("/random", random) //for homepage

router.get("/sub",verifyToken, sub) //show audios of channels signed user subscribed to

router.get("/tags", getByTag)

router.get("/search", search)

export default router;