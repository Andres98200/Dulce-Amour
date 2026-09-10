import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight, Leaf, MessageCircle, Snowflake, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fetchData, getProductbyId } from "../services/api";
import testCake from "../assets/testCake.jpg";
import ProductCard from "../components/layouts/ProductCard";
import ProductDescriptionSkeleton from "../components/layouts/skeletons/ProductSkeleton";
import ProductCardSkeleton from "../components/layouts/skeletons/CardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useLang } from "../context/LangContext";
import type { Product } from "../types/Product";

const WHATSAPP_NUMBER = "33761557413";

// TODO(owner/backend): tailles et prix statiques par défaut, à valider avec
// l'atelier. Les vraies variantes attendent le modèle ProductOption côté API.
const SIZE_TIERS = [
  { id: "petit", labelKey: "Size Petit", portions: "6–8", multiplier: 1 },
  { id: "moyen", labelKey: "Size Moyen", portions: "10–12", multiplier: 1.4 },
  { id: "banquet", labelKey: "Size Banquet", portions: "16–20", multiplier: 2 },
];

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const { lang } = useLang();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      setLoading(true);
      setSelectedSize(0);
      setActiveImage(0);
      getProductbyId(id, lang)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
      // Produits liés : vraies données, page 1 sans le produit courant
      fetchData(lang, 1, 5)
        .then((data) => {
          setRelated(data.products.filter((p) => String(p.id) !== id).slice(0, 4));
        })
        .catch((err) => console.error(err));
    }
  }, [id, lang]); // re-fetch si la langue change

  const images = product?.images?.length
    ? product.images.map((img) => img.url)
    : [testCake];

  const basePrice = parseFloat(product?.price ?? "0") || 0;
  const tierPrice = (multiplier: number) => (Math.round(basePrice * multiplier * 100) / 100).toFixed(2);
  const currentTier = SIZE_TIERS[selectedSize];

  const handleOrder = () => {
    const message = lang === "es"
      ? `Buenos Dias, quiero encargar el ${product?.title} tamaño ${t(currentTier.labelKey)} (${currentTier.portions} ${t("Portions")}), precio ${tierPrice(currentTier.multiplier)}€. ¿Me confirman disponibilidad? Muchas Gracias.`
      : `Bonjour, je souhaite commander le ${product?.title} taille ${t(currentTier.labelKey)} (${currentTier.portions} ${t("Portions")}), prix ${tierPrice(currentTier.multiplier)}€. Pouvez-vous confirmer la disponibilité ? Merci beaucoup.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const tabs = [
    { label: t("Tab ingredients"), body: t("Tab ingredients body") },
    { label: t("Tab allergens"), body: t("Tab allergens body") },
    { label: t("Tab tasting"), body: t("Tab tasting body") },
    { label: t("Tab pickup"), body: t("Tab pickup body") },
  ];

  const trustBadges = [
    { Icon: Snowflake, title: t("Freshly made"), desc: t("Made day of delivery") },
    { Icon: Leaf, title: t("Origin ingredients"), desc: t("Selected with care") },
    { Icon: Truck, title: t("Safe transport"), desc: t("Protective packaging") },
  ];

  return (
    <div className="min-h-screen bg-cream text-cocoa pt-16">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8">
        <nav className="flex items-center gap-1.5 text-xs text-cocoa-muted" aria-label="breadcrumb">
          <Link to="/Home" className="hover:text-maroon">{t("Home")}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/Products" className="hover:text-maroon">{t("Products")}</Link>
          {product?.title && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-semibold text-cocoa truncate max-w-48">{product.title}</span>
            </>
          )}
        </nav>

        <div className="mt-6 flex flex-col md:flex-row gap-6">
          {/* Galerie */}
          <div className="md:w-1/2">
            {loading ? (
              <div className="w-full aspect-square bg-blush-dark animate-pulse rounded-card" />
            ) : (
              <>
                <div className="relative rounded-card overflow-hidden shadow-card">
                  <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={10}
                    slidesPerView={1}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    onSlideChange={(swiper) => setActiveImage(swiper.activeIndex)}
                  >
                    {images.map((url, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={url}
                          alt={`${product?.title || "Product"} ${index + 1}`}
                          className="w-full aspect-square object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <p className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap bg-cocoa/90 text-cream text-xs font-semibold rounded-full px-4 py-1.5">
                    {t("Handmade in atelier")}
                  </p>
                </div>
                {images.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-3">
                    {images.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveImage(index);
                          swiperRef.current?.slideTo(index);
                        }}
                        className={`rounded-cta overflow-hidden border-2 transition ${
                          index === activeImage ? "border-maroon" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`${product?.title} ${index + 1}`}
                      >
                        <img src={url} alt="" className="w-full aspect-square object-cover" />
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {trustBadges.map(({ Icon, title, desc }) => (
                    <div key={title} className="bg-blush/50 rounded-cta px-3 py-3 text-center">
                      <Icon className="w-4 h-4 text-maroon mx-auto" />
                      <p className="mt-1 text-xs font-bold">{title}</p>
                      <p className="text-[11px] text-cocoa-muted">{desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Infos + tailles */}
          <div className="md:w-1/2 bg-cream rounded-card shadow-card p-5 sm:p-7">
            {loading ? (
              <ProductDescriptionSkeleton />
            ) : (
              <>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-blush rounded-full px-3 py-1 font-bold uppercase tracking-wide text-maroon">
                    {t("Artisan exclusive")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-maroon" />
                    {t("Available")}
                  </span>
                </div>
                <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">
                  {product?.title}
                </h1>
                <p className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-maroon">
                    {tierPrice(currentTier.multiplier)}€
                  </span>
                  <span className="text-xs text-cocoa-muted">
                    {t("VAT included")} • {t("Selection by format")}
                  </span>
                </p>
                <p className="mt-3 text-sm text-cocoa-light leading-relaxed">
                  {product?.description}
                </p>

                <div className="mt-5 border-t border-blush-dark pt-4">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold">1. {t("Select size")}</p>
                    <p className="text-xs font-semibold text-maroon">
                      {currentTier.portions} {t("Portions")}
                    </p>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {SIZE_TIERS.map((tier, index) => (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedSize(index)}
                        aria-pressed={index === selectedSize}
                        className={`rounded-cta px-2 py-3 text-center border-2 transition ${
                          index === selectedSize
                            ? "border-maroon bg-blush/60"
                            : "border-blush-dark bg-cream hover:border-maroon/50"
                        }`}
                      >
                        <span className="block text-sm font-bold">{t(tier.labelKey)}</span>
                        <span className="block font-display text-base font-bold text-maroon">
                          {tierPrice(tier.multiplier)}€
                        </span>
                        <span className="block text-[11px] text-cocoa-muted">
                          {tier.portions} {t("Portions")}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-dark text-cream font-semibold rounded-full px-6 py-3.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("Order via WhatsApp")}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Onglets atelier */}
        {!loading && (
          <div className="mt-8 bg-cream rounded-card shadow-card p-5 sm:p-7">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {tabs.map((tab, index) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(index)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                    index === activeTab
                      ? "bg-maroon text-cream"
                      : "bg-blush/60 text-cocoa hover:bg-blush-dark"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-cocoa-light leading-relaxed max-w-3xl">
              {tabs[activeTab].body}
            </p>
          </div>
        )}

        {/* Liés */}
        {!loading && related.length > 0 && (
          <section className="mt-12">
            <p className="text-xs font-bold uppercase tracking-widest text-maroon">{t("Season gallery")}</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <h2 className="font-display text-3xl font-bold">{t("You may also like")}</h2>
              <Link to="/Products" className="inline-flex items-center gap-1 text-xs font-bold text-maroon hover:text-maroon-dark whitespace-nowrap">
                {t("See collection")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
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
          </section>
        )}
        {loading && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
      <div className="h-12"></div>
    </div>
  );
}
