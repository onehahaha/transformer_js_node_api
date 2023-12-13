// userRoutes.js
import express from "express";
import sendHello from "../apis/hello.js";
import voiceToText, { uploadFile } from "../apis/voiceToText.js";

const router = express.Router();

router.get("/hello", sendHello);

router.post("/voiceToText", uploadFile.single("audioFile"), voiceToText);

export default router;
