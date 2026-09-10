import facebook from "../../assets/icons/facebook.png";
import instagram from "../../assets/icons/instagram.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import { useTranslation } from "react-i18next";
import logo2 from "../../assets/logo2.png";
import { useLang } from "../../context/LangContext";

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const { lang } = useLang();

    return (
<footer className="bg-blueCustom w-full p-4 mt-auto">
  <div className="grid grid-cols-2 items-center h-full">
    <div>
      <div className="h-full max-w-48"><img src={logo2} alt="Logo_Image" /></div>
    </div>
    <div className="flex flex-col items-end">
      <p className="font-bold mb-2">{t("Our Social Medias")}</p>
      <ul className="flex flex-col items-start space-y-2">
        <li>
          <a href="https://www.facebook.com/profile.php?id=100066989070614" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" className="w-6 h-6" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/dulce_amour__/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" className="w-6 h-6" />
          </a>
        </li>
        <li>
          <a  href={`https://wa.me/33761557413?text=${encodeURIComponent(
                  lang === "es"
                    ? "Buenos Dias, estoy interesado en realizar un pedido. ¿Podría darme más información? Muchas Gracias."
                    : "Bonjour, j'aimerais réaliser une commande. Pouvez-vous m'en dire plus ? Merci Beaucoup."
                )}`}
                target="_blank">
            <img src={whatsapp} alt="Whatsapp" className="w-6 h-6" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</footer>
    )
};

export default Footer;