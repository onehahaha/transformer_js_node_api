import { getInstance } from "./src/common/transformer.js";

let translator = await getInstance("translation", "Xenova/m2m100_418M", {
  // fromLocal: true,
});

const getTranslateResult = async (
  input = "",
  { src_lang = "zh", tgt_lang = "en" }
) => {
  if (!input) {
    return "请输入要翻译的文字";
  }
  const res = await translator(input, { src_lang, tgt_lang });
  return res;
};

export default getTranslateResult;
