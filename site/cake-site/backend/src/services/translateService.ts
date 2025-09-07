import * as deepl from 'deepl-node';
const translator = new deepl.Translator(process.env.DEEPL_API_KEY as string);

export async function TranslateText(
  text: string,
  targetLang: deepl.TargetLanguageCode
): Promise<string> {
  try {
    const result = await translator.translateText(text, "es", targetLang, {
        formality: "more",
    });
    return result.text;
  } catch (error) {
    console.error("Deepl translating error", error);
    return text;
  }
}
