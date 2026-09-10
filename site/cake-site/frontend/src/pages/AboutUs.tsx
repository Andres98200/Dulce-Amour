import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, CakeSlice, Facebook, Heart, Instagram, MessageCircle, Palette, Sparkles } from "lucide-react";
import aboutPageImage from "../assets/aboutPageImage.png"
import { useLang } from "../context/LangContext";

const WHATSAPP_NUMBER = "33761557413";

export default function AboutUs() {
  const { t } = useTranslation();
  const { lang } = useLang();

  const values = [
    { Icon: CakeSlice, title: t("100% Homemade"), desc: t("Artisanal cakes for every occasion.") },
    { Icon: Palette, title: t("Customization"), desc: t("Your ideas, your themes, your colors.") },
    { Icon: Heart, title: t("Love & Passion"), desc: t("Every creation is unique and carries our signature.") },
    { Icon: Sparkles, title: t("Unforgettable Moments"), desc: t("Weddings, birthdays, parties, we bring a special touch to every event.") },
  ];

  const socials = [
    { href: "https://www.facebook.com/profile.php?id=100066989070614", label: "Facebook", Icon: Facebook },
    { href: "https://www.instagram.com/dulce_amour__/", label: "Instagram", Icon: Instagram },
    {
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        lang === "es"
          ? "Buenos Dias, estoy interesado en realizar un pedido. ¿Podría darme más información? Muchas Gracias."
          : "Bonjour, j'aimerais réaliser une commande. Pouvez-vous m'en dire plus ? Merci Beaucoup."
      )}`,
      label: "Whatsapp", Icon: MessageCircle,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-cream text-cocoa">
      {/* Histoire */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto pt-10 pb-8 grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <p className="inline-flex items-center gap-2 bg-blush rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-maroon">
            {t("Our story")}
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
            {t("Sweet soul")}
          </h1>
          <p className="mt-4 text-cocoa-light leading-relaxed">
            {t(
              "Welcome to Dulce Amour. For many years, we have been sharing our passion for baking and decoration, creating unique and customized cakes to make your events truly unforgettable. Every creation is made with love and care, using only the freshest, highest-quality ingredients.")}
          </p>
          <p className="mt-3 text-cocoa-light leading-relaxed">
            {t("Our team specializes in artistic cakes, cupcakes, tiered cakes, and custom decorations. We are committed to understanding your vision so we can craft a unique culinary and visual experience. Whether for a wedding, birthday, or special celebration, our goal is to make every event a memorable one.")}
          </p>
        </div>
        <div className="relative rounded-card overflow-hidden shadow-card">
          <img
            src={aboutPageImage}
            alt={t("Founder role")}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover"
          />
          <p className="absolute bottom-4 left-4 right-4 bg-cream/95 rounded-cta px-4 py-2.5 text-sm font-bold shadow-card">
            {t("Founder role")}
          </p>
        </div>
      </section>

      {/* Piliers */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto py-8">
        <h2 className="text-center font-display text-3xl sm:text-4xl font-bold">{t("Four pillars")}</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ Icon, title, desc }) => (
            <div key={title} className="p-6 bg-cream shadow-card rounded-card text-center transition-transform duration-200 hover:scale-[1.02]">
              <span className="inline-flex rounded-full bg-blush p-3">
                <Icon className="w-5 h-5 text-maroon" />
              </span>
              <p className="mt-3 font-bold">{title}</p>
              <p className="mt-1 text-sm text-cocoa-light">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto py-8 pb-16">
        <div className="bg-cream rounded-card shadow-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold">
              {t("How to reach us")}
            </h3>
            <div className="mt-4 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full p-2.5 border border-blush-dark hover:bg-blush transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-cream font-semibold rounded-full px-6 py-3 text-sm transition-colors shrink-0"
          >
            {t("Go to contact")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
