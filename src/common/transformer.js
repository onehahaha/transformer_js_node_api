import { pipeline, env } from "@xenova/transformers";
import path from "path";
import { getCurrentPath } from "../utils.js";

const currentFileUrl = import.meta.url;
const currentDir = getCurrentPath(currentFileUrl)
const modelPath = path.join(currentDir, "../../models");

export const getInstance = async (
  task = "",
  model = "",
  { progress_callback = null, fromLocal = false }
) => {
  env.cacheDir = "./.cache";

  if (fromLocal) {
    env.allowLocalModels = true;
    env.allowRemoteModels = false;
    env.localModelPath = modelPath;
  }

  const instance = await pipeline(task, model, { progress_callback });

  return instance;
};
