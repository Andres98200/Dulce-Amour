import facebook from "../../assets/icons/facebook.png";
import instagram from "../../assets/icons/instagram.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import { useTranslation } from "react-i18next";
import logo2 from "../../assets/logo2.png";

const Footer: React.FC = () => {
    const { t } = useTranslation();

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
          <a href="https://www.facebook.com/decor_artballons/" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" className="w-6 h-6" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/decor_artballons/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" className="w-6 h-6" />
          </a>
        </li>
        <li>
          <a href="https://wa.me/tonnumero" target="_blank" rel="noopener noreferrer">
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