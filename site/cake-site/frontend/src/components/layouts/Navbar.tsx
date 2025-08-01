import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import EN from "../../assets/flags/EN.svg"
import FR from "../../assets/flags/FR.png";
import sp from "../../assets/flags/sp.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [ openLangMenu, setOpenLangMenu] = useState(false);


  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setOpenLangMenu(false);
  };

  return (
    <nav className="bg-roseCustom text-base-gray-950 p-4  w-full fixed top-0 left-0">
      <ul className="flex space-x-6 justify-end items-center">
      <li className="relative">
          <button
            onClick={() => setOpenLangMenu(!openLangMenu)}
            className="rounded-full p-2 shadow-md hover:shadow-lg transition"
            aria-label="Changer la langue"
          >
            <Globe className="w-6 h-6 text-black" />
          </button>
          {openLangMenu && (
            <div className="absolute right-0 mt-2 w-20 rounded-full shadow-lg">
              <button onClick={() => changeLanguage("fr")} className="w-full px-3 py-2">
                <img src={FR} alt="Français" className="w-6 h-6 mx-auto " />
              </button>

              <button onClick={() => changeLanguage("en")} className="w-full px-3 py-2">
                <img src={EN} alt="English" className="w-6 h-6 mx-auto" />
              </button>

              <button onClick={() => changeLanguage("en")} className="w-full px-3 py-2">
                <img src={sp} alt="Spanish" className="w-6 h-6 mx-auto" />
              </button>
            </div>

)}

        </li>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/Products">Products</Link>
        </li>
        <li>
          <Link to="/AboutUs">About Us</Link>
        </li>
        <li>
          <button className="hover:bg-black-400" onClick={() => navigate('/login')}>Log In</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
