import wavefile from "wavefile";
import { readFileAsArrayBuffer } from "../utils.js";
import { getInstance } from "../common/transformer.js";

/**
 * @param {File} file 语音文件 wav格式
 *  */
const getVoiceToTextResult = async (file) => {

  let transcriber = await getInstance(
    "automatic-speech-recognition",
    "whisper-tiny.en",
    {
      fromLocal: true,
    }
  );

  let buffer = Buffer.from(await readFileAsArrayBuffer(file));

  // Read .wav file and convert it to required format
  let wav = new wavefile.WaveFile(buffer);
  wav.toBitDepth("32f"); // Pipeline expects input as a Float32Array
  wav.toSampleRate(16000); // Whisper expects audio with a sampling rate of 16000
  let audioData = wav.getSamples();
  if (Array.isArray(audioData)) {
    if (audioData.length > 1) {
      const SCALING_FACTOR = Math.sqrt(2);
      // Merge channels (into first channel to save memory)
      for (let i = 0; i < audioData[0].length; ++i) {
        audioData[0][i] =
          (SCALING_FACTOR * (audioData[0][i] + audioData[1][i])) / 2;
      }
    }
    // Select first channel
    audioData = audioData[0];
  }

  let start = performance.now();
  let output = await transcriber(audioData);
  let end = performance.now();

  return {
    duration: (end - start) / 1000,
    result: output,
  };
};

export default getVoiceToTextResult;
