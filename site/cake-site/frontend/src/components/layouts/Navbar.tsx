import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Languages, Menu, X } from 'lucide-react';
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./LanguageSwitch";
import { logout as apiLogout } from "../../services/api";
import logo from "../../assets/logo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openLangMenu, setOpenLangMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = sessionStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
  apiLogout(); 
  navigate("/login");
};


  return (
    <nav className="bg-roseCustom text-base-gray-950 p-4 w-full fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="h-full max-w-24"><img src={logo} alt="Logo_Image" /></div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li className="relative">
            <button
              onClick={() => setOpenLangMenu(!openLangMenu)}
              className="rounded-full p-2 shadow-md hover:shadow-lg transition"
              aria-label={t("Change language")}
            >
              <Languages className="w-6 h-6 text-black"/>
            </button>
            {openLangMenu && (
              <div className="absolute right-0 mt-2 rounded-full shadow-lg bg-white z-50">
                <LanguageSwitch />
              </div>
            )}
          </li>
          <li>
            <Link to="/Home">{t("Home")}</Link>
          </li>
          <li>
            <Link to="/Products">{t("Products")}</Link>
          </li>
          <li>
            <Link to="/about-us">{t("About Us")}</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>
                {t("Log Out")}
              </button>
          </li>
          ) : (
          <li>
            <button onClick={() => navigate('/login')}>
              {t("Log In")}
            </button>
          </li>
          )}
        </ul>

        {/* Mobile Burger Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={t("Toggle menu")}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-black" />
          ) : (
            <Menu className="w-6 h-6 text-black" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link to="/Home" onClick={() => setIsMenuOpen(false)}>{t("Home")}</Link>
            </li>
            <li>
              <Link to="/Products" onClick={() => setIsMenuOpen(false)}>{t("Products")}</Link>
            </li>
            <li>
              <Link to="/about-us" onClick={() => setIsMenuOpen(false)}>{t("About Us")}</Link>
            </li>
            <li>
              <button 
                className="hover:bg-black-400" 
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              >
                {t("Log In")}
              </button>
            </li>
            <li className="pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{t("Language")}:</span>
                <LanguageSwitch />
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;