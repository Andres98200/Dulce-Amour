import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Languages, Menu, X } from 'lucide-react';
import { useTranslation } from "react-i18next";
import EN from "../../assets/flags/EN.svg"
import FR from "../../assets/flags/FR.png";
import sp from "../../assets/flags/sp.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [ openLangMenu, setOpenLangMenu] = useState(false);
  const [ isMenuOpen, setIsMenuOpen] = useState(false);


  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setOpenLangMenu(false);
  };

  return (
    <nav className="bg-roseCustom text-base-gray-950 p-4 w-full fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-xl font-bold">Site Name or LOGO</div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li className="relative">
            <button
              onClick={() => setOpenLangMenu(!openLangMenu)}
              className="rounded-full p-2 shadow-md hover:shadow-lg transition"
              aria-label="Changer la langue"
            >
              <Languages className="w-6 h-6 text-black" />
            </button>
            {openLangMenu && (
              <div className="absolute right-0 mt-2 w-20 rounded-full shadow-lg bg-white">
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

        {/* Mobile Burger Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
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
              <Link to="/Home" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/Products" onClick={() => setIsMenuOpen(false)}>Products</Link>
            </li>
            <li>
              <Link to="/AboutUs" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            </li>
            <li>
              <button 
                className="hover:bg-black-400" 
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              >
                Log In
              </button>
            </li>
            <li className="pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Language:</span>
                <button onClick={() => changeLanguage("fr")} className="p-1">
                  <img src={FR} alt="Français" className="w-5 h-5" />
                </button>
                <button onClick={() => changeLanguage("en")} className="p-1">
                  <img src={EN} alt="English" className="w-5 h-5" />
                </button>
                <button onClick={() => changeLanguage("en")} className="p-1">
                  <img src={sp} alt="Spanish" className="w-5 h-5" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
