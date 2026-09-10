import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Languages, Menu, X, User, LogOut, ShoppingBag } from 'lucide-react';
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./LanguageSwitch";
import { logout as apiLogout } from "../../services/api";
import { useLang } from "../../context/LangContext";

const WHATSAPP_NUMBER = "33761557413";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang } = useLang();
  const [openLangMenu, setOpenLangMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = sessionStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    apiLogout();
    navigate("/login");
  };

  const orderLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === "es"
      ? "Hola Dulce Amour, quiero hacer un pedido. ¿Me ayudan? ¡Gracias!"
      : "Bonjour Dulce Amour, je souhaite passer une commande. Pouvez-vous m'aider ? Merci !"
  )}`;

  const navLinks = [
    { to: "/Home", label: t("Home") },
    { to: "/Products", label: t("Products") },
    { to: "/about-us", label: t("About Us") },
  ];

  return (
    <nav className="bg-cream/90 backdrop-blur border-b border-blush-dark text-cocoa w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* Brand */}
        <Link to="/Home" className="font-display text-xl font-bold tracking-tight">
          Dulce Amour
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="hover:text-maroon transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" className="hover:text-maroon transition-colors">
              {t("Contact")}
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => setOpenLangMenu(!openLangMenu)}
              className="rounded-full p-2 border border-blush-dark hover:bg-blush transition"
              aria-label={t("Change language")}
            >
              <Languages className="w-5 h-5 text-cocoa" />
            </button>
            {openLangMenu && (
              <div className="absolute right-0 mt-2 rounded-full shadow-card bg-cream z-50 p-1">
                <LanguageSwitch />
              </div>
            )}
          </li>
          <li>
            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-maroon text-cream rounded-full px-4 py-2 text-sm font-semibold hover:bg-maroon-dark transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {t("Order Now")}
            </a>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="rounded-full p-2 border border-blush-dark hover:bg-blush transition"
                aria-label={t("Log Out")}
                title={t("Log Out")}
              >
                <LogOut className="w-5 h-5 text-cocoa" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="rounded-full p-2 border border-blush-dark hover:bg-blush transition"
                aria-label={t("Log In")}
                title={t("Log In")}
              >
                <User className="w-5 h-5 text-cocoa" />
              </button>
            )}
          </li>
        </ul>

        {/* Mobile Burger Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={t("Toggle menu")}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-cocoa" />
          ) : (
            <Menu className="w-6 h-6 text-cocoa" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mx-4 mb-4 bg-cream rounded-card shadow-card p-4 border border-blush-dark">
          <ul className="flex flex-col space-y-4 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                {t("Contact")}
              </Link>
            </li>
            <li>
              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-maroon text-cream rounded-full px-4 py-2 text-sm font-semibold"
              >
                <ShoppingBag className="w-4 h-4" />
                {t("Order Now")}
              </a>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  className="inline-flex items-center gap-2"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  {t("Log Out")}
                </button>
              ) : (
                <button
                  className="inline-flex items-center gap-2"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4" />
                  {t("Log In")}
                </button>
              )}
            </li>
            <li className="pt-3 border-t border-blush-dark">
              <div className="flex items-center gap-2">
                <span className="text-xs text-cocoa-muted">{t("Language")}:</span>
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
