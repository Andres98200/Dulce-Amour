import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import aboutPageImage from "../assets/aboutPageImage.png"

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen px-6 lg:px-20 bg-gray-50">
      {/* Section principale */}
      <div className="flex flex-col xl:flex-row items-center xl:justify-center justify-between flex-grow gap-12">
        
        {/* Texte */}
        <div className="w-full xl:flex-1 flex flex-col justify-center pt-20">
          <h1 className="font-bold text-3xl mb-6 pt-10">{t("About Us")}</h1>
          <p className="text-gray-700 leading-relaxed mb-7">
            {t(
              "Welcome to Dulce Amour. For many years, we have been sharing our passion for baking and decoration, creating unique and customized cakes to make your events truly unforgettable. Every creation is made with love and care, using only the freshest, highest-quality ingredients.")}<br />
            <br />
            {t("Our team specializes in artistic cakes, cupcakes, tiered cakes, and custom decorations. We are committed to understanding your vision so we can craft a unique culinary and visual experience. Whether for a wedding, birthday, or special celebration, our goal is to make every event a memorable one.")}
          </p>

          <h2 className="font-bold text-3xl">{t("Ours Values")}</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-white shadow rounded-xl text-center transition-transform duration-200 hover:scale-[1.02] w-full cursor-pointer">
              🎂 <p className="font-semibold">{t("100% Homemade")}</p>
              <p className="text-sm text-gray-600">{t("Artisanal cakes for every occasion.")}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl text-center transition-transform duration-200 hover:scale-[1.02] w-full cursor-pointer">
              🎨 <p className="font-semibold">{t("Customization")}</p>
              <p className="text-sm text-gray-600">{t("Your ideas, your themes, your colors.")}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl text-center transition-transform duration-200 hover:scale-[1.02] w-full cursor-pointer">
              💌 <p className="font-semibold">{t("Love & Passion")}</p>
              <p className="text-sm text-gray-600">{t("Every creation is unique and carries our signature.")}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl text-center transition-transform duration-200 hover:scale-[1.02] w-full cursor-pointer">
              🎉 <p className="font-semibold">{t("Unforgettable Moments")}</p>
              <p className="text-sm text-gray-600">{t("Weddings, birthdays, parties, we bring a special touch to every event.")}</p>
            </div>
          </div>

          {/* Bloc réseaux sociaux */}
          <div className="mb-10">
            <h3 className="text-3xl font-bold mb-8 ">
              {t("How to reach us")}
            </h3>
            <div className="flex flex-col space-y-3">
              <a
                href="#"
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition mb-4 "
              >
                <FaFacebook size={80} /> Facebook
              </a>
              <a
                href="https://www.instagram.com/decor_artballons/"
                className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition mb-4"
              >
                <FaInstagram size={80} /> Instagram
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-700 hover:text-green-500 transition mt-4"
              >
                <FaWhatsapp size={80} /> Whatsapp
              </a>
            </div>
          </div>
        </div>

        {/* Image visible seulement en XL */}
        <div className="hidden xl:flex flex-1 justify-center">
          <img
            src={aboutPageImage}
            alt="Cake"
            className="rounded-2xl w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
