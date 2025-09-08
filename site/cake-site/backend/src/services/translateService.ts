import * as deepl from "deepl-node";

const authKey = process.env.DEEPL_API_KEY as string;
const translator = new deepl.Translator(authKey);

/**
 * Traduit un texte en français
 * @param text Texte source (en espagnol)
 * @param targetLang Langue cible ("fr" uniquement dans notre cas)
 */
export async function TranslateText(text: string, targetLang: "fr"): Promise<string> {
  try {
    if (!text || text.trim() === "") {
      return "";
    }

    const result = await translator.translateText(text, "es", targetLang);
    return result.text;
  } catch (error) {
    console.error("Error translating text:", error);
    return text; // fallback = retourne le texte original
  }
}
