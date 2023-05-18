import express from "express";
import { addAudio, addView, getByTag, getAudio, random, search, sub, trend, latest, getChannelAudios } from "../controllers/audio.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create an audio
router.post("/", verifyToken, addAudio)

router.put("/:id", verifyToken, addAudio) //modify

router.delete("/:id", verifyToken, addAudio) //delete

router.get("/find/:id", getAudio) //fetch audio

router.get("/artist/:id", getChannelAudios) //fetch channel audio

router.put("/view/:id", addView) //increase views on audio id

router.get("/trend", trend)

router.get("/latest", latest)

router.get("/random", random) //for homepage

router.get("/sub", verifyToken, sub) //show audios of channels signed user subscribed to

router.get("/tags", getByTag) //for genres

router.get("/search", search)

export default router;