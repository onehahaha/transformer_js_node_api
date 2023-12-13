import path from "path";
import multer from "multer";
import fs from "fs";
import { getCurrentPath } from "../utils.js";
import getVoiceToTextResult from "../ai_models/v2t.js";

// 设置存储引擎和文件名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 设置上传文件存储路径
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 设置上传文件的文件名
  },
});

// 创建multer实例
const uploadFile = multer({ storage });

const voiceToText = async (req, res) => {
  if (!req.file) {
    return res.status(500).send("Error saving the file.");
  }

  const currentDir = getCurrentPath(import.meta.url);
  // 加载音频文件
  const file = path.join(currentDir, "../../uploads", req.file.filename);

  try {
    const result = await getVoiceToTextResult(file);
    res.send({
      data: result,
    });

    await fs.promises.unlink(file)
  } catch (error) {
    res.status(500).send({
      data: error.message,
    });
  }
};

export { uploadFile };

export default voiceToText;
