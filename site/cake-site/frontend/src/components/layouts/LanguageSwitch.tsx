import { useTranslation } from "react-i18next";
import { useLang } from "../../context/LangContext";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const { lang, setLang } = useLang(); 

  const getButtonClass = (buttonLang: string) =>
    `px-2.5 py-1 rounded-full text-xs font-semibold transition-colors duration-200
     ${lang === buttonLang ? "bg-maroon text-cream" : "text-cocoa-light hover:bg-blush"}`;

  const handleChange = (buttonLang: "es" | "fr") => {
    i18n.changeLanguage(buttonLang);
    setLang(buttonLang); 
  };

  return (
    <div className="flex gap-1 p-1 min-w-[100px] justify-center bg-cream-dark rounded-full border border-blush-dark">
      <button className={getButtonClass("es")} onClick={() => handleChange("es")}>ES</button>
      <button className={getButtonClass("fr")} onClick={() => handleChange("fr")}>FR</button>
    </div>
  );
};

export default LanguageSwitch;
