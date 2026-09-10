import { useState, type FormEvent } from "react";
import { Clock, Instagram, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLang } from "../context/LangContext";

const WHATSAPP_NUMBER = "33761557413";
const INSTAGRAM_URL = "https://www.instagram.com/dulce_amour__/";

export default function Contact() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");

  const whatsappDirect = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === "es"
      ? "Buenos Dias, estoy interesado en realizar un pedido. ¿Podría darme más información? Muchas Gracias."
      : "Bonjour, j'aimerais réaliser une commande. Pouvez-vous m'en dire plus ? Merci Beaucoup."
  )}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text =
      lang === "es"
        ? `Hola Dulce Amour, soy ${name} (${contact}). Fecha: ${date || "-"}, invitados: ${guests || "-"}. Mi idea: ${message}`
        : `Bonjour Dulce Amour, je suis ${name} (${contact}). Date : ${date || "-"}, invités : ${guests || "-"}. Mon idée : ${message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const inputClass =
    "w-full bg-cream border border-blush-dark rounded-cta px-4 py-2.5 text-sm text-cocoa placeholder:text-cocoa-muted focus:outline-none focus:border-maroon";

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-cream text-cocoa">
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto pt-10 pb-16">
        <p className="inline-flex items-center gap-2 bg-blush rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-maroon">
          {t("Contact badge")}
        </p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight max-w-2xl">
          {t("Contact title")}
        </h1>
        <p className="mt-3 text-cocoa-light max-w-2xl">{t("Contact desc")}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Formulaire -> WhatsApp, pas de backend */}
          <form onSubmit={handleSubmit} className="bg-cream rounded-card shadow-card p-6 sm:p-8 flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                {t("Your name")}
                <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                {t("Email or phone")}
                <input required value={contact} onChange={(e) => setContact(e.target.value)} className={inputClass} />
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                {t("Event date")}
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                {t("Guests")}
                <input type="number" min={1} value={guests} onChange={(e) => setGuests(e.target.value)} className={inputClass} />
              </label>
            </div>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              {t("Your idea")}
              <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={inputClass} />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-dark text-cream font-semibold rounded-full px-6 py-3 text-sm transition-colors"
            >
              <Send className="w-4 h-4" />
              {t("Send via WhatsApp")}
            </button>
          </form>

          {/* Infos */}
          <div className="flex flex-col gap-4">
            <a href={whatsappDirect} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-cream rounded-cta shadow-card px-5 py-4 hover:scale-[1.01] transition-transform">
              <span className="rounded-full bg-blush p-2.5 shrink-0"><Phone className="w-4 h-4 text-maroon" /></span>
              <div>
                <p className="text-sm font-bold">WhatsApp +33 7 61 55 74 13</p>
                <p className="text-xs text-cocoa-muted">{t("Avg response")}</p>
              </div>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-cream rounded-cta shadow-card px-5 py-4 hover:scale-[1.01] transition-transform">
              <span className="rounded-full bg-blush p-2.5 shrink-0"><Instagram className="w-4 h-4 text-maroon" /></span>
              <div>
                <p className="text-sm font-bold">@dulce_amour__</p>
                <p className="text-xs text-cocoa-muted">Instagram</p>
              </div>
            </a>
            <div className="bg-cream rounded-cta shadow-card px-5 py-4">
              <p className="inline-flex items-center gap-2 text-sm font-bold">
                <MapPin className="w-4 h-4 text-maroon" />
                {t("Visit atelier")}
              </p>
              <ul className="mt-2 space-y-1 text-xs text-cocoa-light">
                <li className="flex justify-between"><span>{t("Mon - Fri")}:</span><span className="font-semibold">9:00 - 20:00</span></li>
                <li className="flex justify-between"><span>{t("Saturdays")}:</span><span className="font-semibold">10:00 - 21:00</span></li>
                <li className="flex justify-between"><span>{t("Sundays")}:</span><span className="font-semibold">10:00 - 16:00</span></li>
              </ul>
              <p className="mt-3 inline-flex items-center gap-1.5 bg-blush rounded-full px-3 py-1 text-[11px] font-bold">
                <Clock className="w-3.5 h-3.5 text-maroon" />
                {t("Orders with 48h notice")}
              </p>
            </div>
            <a href={whatsappDirect} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-maroon text-maroon font-semibold rounded-full px-6 py-3 text-sm hover:bg-blush transition-colors">
              <MessageCircle className="w-4 h-4" />
              {t("Write on WhatsApp")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
