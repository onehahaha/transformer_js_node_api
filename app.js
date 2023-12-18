import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs/promises";
import multer from "multer";
import getVoiceToTextResult from "./src/ai_models/v2t.js";
import { getCurrentPath } from "./src/utils.js";
import apiRoutes from "./src/routes/index.js";

const app = express();
const port = 3411;

// 使用用户路由
app.use("/apis", apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
