import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const getButtonClass = (lang: string) =>
    `px-2 py-2 rounded-lg text-xs font-semibold transition-colors duration-200
     ${currentLang === lang ? "bg-roseCustom text-white" : "bg-gray-200 text-black hover:bg-pink-100"}`;

  return (
    <div className="flex gap-4 p-4 min-w-[100px] justify-center">
      <button
        className={getButtonClass("en")}
        onClick={() => i18n.changeLanguage("en")}
      >
        English
      </button>
      <button
        className={getButtonClass("fr")}
        onClick={() => i18n.changeLanguage("fr")}
      >
        Français
      </button>
      <button
        className={getButtonClass("es")}
        onClick={() => i18n.changeLanguage("es")}
      >
        Español
      </button>
    </div>
  );
};

export default LanguageSwitch;