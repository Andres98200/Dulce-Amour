import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import testCake from "../assets/testCake.jpg";

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen pt-24 px-6 lg:px-20 bg-gray-50">
      {/* Section principale en 2 colonnes */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between flex-grow gap-12">
        {/* Texte */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-bold text-4xl mb-6">{t("About Us")}</h1>
          <p className="text-gray-700 leading-relaxed mb-8">
            Le Lorem Ipsum est simplement du faux texte employé dans la
            composition et la mise en page avant impression. Le Lorem Ipsum est
            le faux texte standard de l'imprimerie depuis les années 1500. <br />
            <br />
            Le Lorem Ipsum est simplement du faux texte employé dans la
            composition et la mise en page avant impression. Le Lorem Ipsum est
            le faux texte standard de l'imprimerie depuis les années 1500.
            Le Lorem Ipsum est simplement du faux texte employé dans la
            composition et la mise en page avant impression. Le Lorem Ipsum est
            le faux texte standard de l'imprimerie depuis les années 1500.
          </p>

          {/* Bloc réseaux sociaux */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              {t("How to reach us")}
            </h2>
            <div className="flex flex-col space-y-3">
              <a
                href="#"
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition mb-4"
              >
                <FaFacebook size={80} /> Facebook
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition mb-4"
              >
                <FaInstagram size={80} /> Instagram
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-700 hover:text-sky-500 transition mb-4"
              >
                <FaTwitter size={80} /> Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={testCake}
            alt="Cake"
            className="rounded-2xl shadow-lg max-w-xl w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
