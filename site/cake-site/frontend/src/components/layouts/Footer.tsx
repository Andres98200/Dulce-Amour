import { Facebook, Instagram, MessageCircle, Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLang } from "../../context/LangContext";

const WHATSAPP_NUMBER = "33761557413";
const WHATSAPP_DISPLAY = "+33 7 61 55 74 13";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100066989070614";
const INSTAGRAM_URL = "https://www.instagram.com/dulce_amour__/";
const INSTAGRAM_HANDLE = "@dulce_amour__";

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const { lang } = useLang();

    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        lang === "es"
            ? "Buenos Dias, estoy interesado en realizar un pedido. ¿Podría darme más información? Muchas Gracias."
            : "Bonjour, j'aimerais réaliser une commande. Pouvez-vous m'en dire plus ? Merci Beaucoup."
    )}`;

    const socials = [
        { href: FACEBOOK_URL, label: "Facebook", Icon: Facebook },
        { href: INSTAGRAM_URL, label: "Instagram", Icon: Instagram },
        { href: whatsappLink, label: "Whatsapp", Icon: MessageCircle },
    ];

    const schedule = [
        { days: t("Mon - Fri"), hours: "9:00 - 20:00" },
        { days: t("Saturdays"), hours: "10:00 - 21:00" },
        { days: t("Sundays"), hours: "10:00 - 16:00" },
    ];

    return (
        <footer className="bg-cream-deeper text-cocoa w-full mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                {/* Brand */}
                <div>
                    <p className="font-display text-xl font-bold">Dulce Amour</p>
                    <p className="mt-3 text-sm text-cocoa-light leading-relaxed">
                        {t("Brand tagline")}
                    </p>
                    <div className="mt-4 flex gap-2">
                        {socials.map(({ href, label, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="rounded-full p-2 border border-blush-dark hover:bg-blush transition"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <p className="font-display text-lg font-bold">{t("Navigation")}</p>
                    <ul className="mt-3 space-y-2 text-sm">
                        <li><Link to="/Home" className="hover:text-maroon transition-colors">{t("Home")}</Link></li>
                        <li><Link to="/Products" className="hover:text-maroon transition-colors">{t("Products")}</Link></li>
                        <li><Link to="/about-us" className="hover:text-maroon transition-colors">{t("About Us")}</Link></li>
                        <li><Link to="/contact" className="hover:text-maroon transition-colors">{t("Contact Us")}</Link></li>
                    </ul>
                </div>

                {/* Schedule */}
                <div>
                    <p className="font-display text-lg font-bold">{t("Atelier Hours")}</p>
                    <ul className="mt-3 space-y-2 text-sm">
                        {schedule.map((row) => (
                            <li key={row.days} className="flex justify-between gap-4">
                                <span className="text-cocoa-light">{row.days}:</span>
                                <span className="font-medium">{row.hours}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 inline-flex items-center gap-2 bg-blush rounded-full px-3 py-1 text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        {t("Orders with 48h notice")}
                    </p>
                </div>

                {/* Direct contact */}
                <div>
                    <p className="font-display text-lg font-bold">{t("Direct Contact")}</p>
                    <ul className="mt-3 space-y-2 text-sm">
                        <li>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-maroon transition-colors">
                                <Phone className="w-4 h-4" />
                                WhatsApp {WHATSAPP_DISPLAY}
                            </a>
                        </li>
                        <li>
                            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-maroon transition-colors">
                                <Instagram className="w-4 h-4" />
                                {INSTAGRAM_HANDLE}
                            </a>
                        </li>
                        <li className="inline-flex items-center gap-2 text-cocoa-light">
                            <MapPin className="w-4 h-4" />
                            Obrador Central
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-blush-dark">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-cocoa-muted">
                    <p>© 2024 Dulce Amour. {t("All rights reserved")}.</p>
                    <div className="flex gap-4">
                        <span>{t("Privacy")}</span>
                        <span>{t("Terms of Service")}</span>
                        <span>{t("Allergens")}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
