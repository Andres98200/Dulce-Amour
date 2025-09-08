import { useTranslation } from "react-i18next";
import { useLang } from "../../context/LangContext";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const { lang, setLang } = useLang(); 

  const getButtonClass = (buttonLang: string) =>
    `px-2 py-1 rounded-lg text-xs font-semibold transition-colors duration-200
     ${lang === buttonLang ? "bg-roseCustom text-white" : "bg-gray-200 text-black hover:bg-pink-100"}`;

  const handleChange = (buttonLang: "es" | "fr") => {
    i18n.changeLanguage(buttonLang);
    setLang(buttonLang); 
  };

  return (
    <div className="flex gap-4 p-4 min-w-[100px] justify-center">
      <button className={getButtonClass("fr")} onClick={() => handleChange("fr")}>Français</button>
      <button className={getButtonClass("es")} onClick={() => handleChange("es")}>Español</button>
    </div>
  );
};

export default LanguageSwitch;
