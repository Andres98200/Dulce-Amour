import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Heart,
  Leaf,
  MessageCircle,
  Phone,
  SlidersHorizontal,
  Star,
  Store,
  Truck,
} from "lucide-react";
import ProductCard from "../components/layouts/ProductCard";
import type { Product } from "../types/Product";
import { getProductbyId } from "../services/api";
import testCake from "../assets/testCake.jpg";
import { useTranslation } from "react-i18next";
import ProductCardSkeleton from "../components/layouts/skeletons/CardSkeleton";
import { useLang } from "../context/LangContext";

const WHATSAPP_NUMBER = "33761557413";
const featureKeys = ["feature_1", "feature_2", "feature_3", "feature_4"];

export default function Home() {
  const navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const { lang } = useLang();

  useEffect(() => {
    const bestSellersIds = ["1", "5", "3", "4"];
    setLoading(true);
    Promise.all(bestSellersIds.map(id => getProductbyId(id, lang)))
      .then(products => {
        setBestSellers(products);
        setTimeout(() => setLoading(false), 800);
      })
      .catch(err => {
        setError(err.message);
        setTimeout(() => setLoading(false), 800);
      });
  }, [lang]);

  const orderLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === "es"
      ? "Hola Dulce Amour, quiero hacer un pedido personalizado. ¿Me ayudan? ¡Gracias!"
      : "Bonjour Dulce Amour, je souhaite une commande personnalisée. Pouvez-vous m'aider ? Merci !"
  )}`;

  const contactLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === "es"
      ? "Buenos Dias, estoy interesado en realizar un pedido. ¿Podría darme más información? Muchas Gracias."
      : "Bonjour, j'aimerais réaliser une commande. Pouvez-vous m'en dire plus ? Merci Beaucoup."
  )}`;

  const miniFeatures = [
    { Icon: Heart, title: t("Mini 1 title"), desc: t("Mini 1 desc") },
    { Icon: Leaf, title: t("Mini 2 title"), desc: t("Mini 2 desc") },
    { Icon: SlidersHorizontal, title: t("Mini 3 title"), desc: t("Mini 3 desc") },
    { Icon: Truck, title: t("Mini 4 title"), desc: t("Mini 4 desc") },
  ];

  const reviews = [
    { quote: t("Review 1 quote"), name: t("Review 1 name"), detail: t("Review 1 detail"), initials: "CL" },
    { quote: t("Review 2 quote"), name: t("Review 2 name"), detail: t("Review 2 detail"), initials: "AM" },
    { quote: t("Review 3 quote"), name: t("Review 3 name"), detail: t("Review 3 detail"), initials: "SV" },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-cream text-cocoa">
      {/* HERO */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto pt-10 pb-12 grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <p className="inline-flex items-center gap-2 bg-blush rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-maroon">
            {t("Artisan badge")}
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.05]">
            {t("Hero title 1")}{" "}
            <span className="italic text-maroon">{t("Hero title 2")}</span>{" "}
            {t("Hero title 3")}
          </h1>
          <p className="mt-4 text-cocoa-light leading-relaxed max-w-xl">
            {t("Hero description")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/Products")}
              className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-cream font-semibold rounded-full px-6 py-3 transition-colors"
            >
              <Store className="w-4 h-4" />
              {t("See our cakes")}
            </button>
            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blush hover:bg-blush-dark text-cocoa font-semibold rounded-full px-6 py-3 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t("Custom order")}
            </a>
          </div>
          <div className="mt-6 bg-cream rounded-card shadow-card p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {miniFeatures.map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-1">
                <Icon className="w-5 h-5 text-maroon" />
                <p className="text-xs font-bold">{title}</p>
                <p className="text-[11px] text-cocoa-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative bg-cream rounded-card shadow-soft overflow-hidden p-4">
          <div className="h-5 bg-roseCustom rounded-t-card -m-4 mb-4" />
          <img
            src={testCake}
            alt={t("Today special")}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover rounded-cta"
          />
          <p className="absolute top-8 right-8 inline-flex items-center gap-1.5 bg-cream/95 rounded-full px-3 py-1.5 text-xs font-bold shadow-card">
            <Star className="w-3.5 h-3.5 fill-maroon text-maroon" />
            {t("House recipe")} <span className="text-maroon">4.9/5</span>
          </p>
          <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-cream/95 rounded-cta px-4 py-2.5 shadow-card">
            <span className="rounded-full bg-blush p-2">
              <Heart className="w-4 h-4 text-maroon" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-cocoa-muted">{t("Made today")}</p>
              <p className="text-sm font-bold">{t("Today special")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAVORITES */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto py-12">
        <p className="text-xs font-bold uppercase tracking-widest text-maroon">{t("Our specialties")}</p>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{t("House favorites")}</h2>
            <p className="mt-2 text-cocoa-light max-w-2xl">{t("Favorites description")}</p>
          </div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-maroon whitespace-nowrap">
            {t("Made to order 48h")}
            <Clock className="w-4 h-4" />
          </p>
        </div>

        {loading ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="mt-8 text-red-500">{error}</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {bestSellers.map(p => (
              <ProductCard
                key={p.id}
                id={String(p.id)}
                title={p.title}
                description={p.description}
                price={p.price}
                image={p.images[0]?.url ?? undefined}
              />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/Products")}
            className="inline-flex items-center gap-2 bg-blush-muted/60 hover:bg-blush-dark text-cocoa font-semibold rounded-full px-6 py-3 transition-colors"
          >
            {t("See all products")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* WHY */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto py-12 grid gap-8 lg:grid-cols-[1fr_1.2fr] items-stretch">
        <div className="relative rounded-card overflow-hidden shadow-card min-h-80">
          <img src={testCake} alt={t("100% Passion")} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 bg-cocoa/90 text-cream rounded-cta px-4 py-3">
            <span className="rounded-full bg-maroon p-2">
              <Heart className="w-4 h-4" />
            </span>
            <div>
              <p className="text-sm font-bold">{t("100% Passion")}</p>
              <p className="text-xs text-cream/80">{t("Small batches")}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-maroon">{t("The Dulce Amour seal")}</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
            {t("Why Choose our boutique ?")}
          </h2>
          <p className="mt-2 text-cocoa-light">{t("boutique_description")}</p>
          <div className="mt-6 flex flex-col gap-4">
            {featureKeys.map((key, index) => (
              <div key={key} className="flex items-start gap-4 bg-cream rounded-cta shadow-card p-4">
                <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-blush font-display font-bold text-maroon">
                  {index + 1}
                </span>
                <p className="text-sm text-cocoa-light leading-relaxed">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto py-12">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-maroon">{t("Our community voices")}</p>
        <h2 className="mt-2 text-center font-display text-3xl sm:text-4xl font-bold">{t("What they say")}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="bg-cream rounded-card shadow-card p-6 flex flex-col">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-maroon text-maroon" />
                ))}
              </div>
              <p className="mt-3 text-sm text-cocoa-light leading-relaxed flex-1">“{review.quote}”</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blush text-xs font-bold text-maroon">
                  {review.initials}
                </span>
                <div>
                  <p className="text-sm font-bold">{review.name}</p>
                  <p className="text-xs text-cocoa-muted">{review.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto pt-4 pb-16">
        <div className="bg-gradient-to-br from-maroon-dark via-maroon to-maroon-light rounded-3xl px-6 sm:px-10 py-10 text-cream flex flex-col lg:flex-row lg:items-center gap-6 justify-between shadow-soft">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-cream/80">{t("Custom atelier")}</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold !text-cream">{t("Design together")}</h2>
            <p className="mt-2 text-sm text-cream/85 leading-relaxed">{t("Atelier description")}</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-cream text-maroon font-semibold rounded-full px-6 py-3 text-sm hover:bg-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t("Write on WhatsApp")}
            </a>
            <a
              href={contactLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-cream/20 text-cream font-semibold rounded-full px-6 py-3 text-sm hover:bg-cream/30 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t("See contact")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
