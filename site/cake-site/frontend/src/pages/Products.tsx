import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Clock,
  Leaf,
  MessageCircle,
  Snowflake,
  Truck,
} from "lucide-react";
import ProductCard from "../components/layouts/ProductCard";
import ProductCardSkeleton from "../components/layouts/skeletons/CardSkeleton";
import PaginationSkeleton from "../components/layouts/skeletons/PaginationSkeleton";
import type { Product } from "../types/Product";
import type { ProductListResponse } from "../types/Product";
import { fetchData } from "../services/api";
import { useTranslation } from "react-i18next";
import { useLang } from "../context/LangContext";
import atelierImage from "../assets/aboutPageImage.png";

const WHATSAPP_NUMBER = "33761557413";

// TODO(backend): remplacer par les catégories serveur (champ category/tags)
// quand l'API supportera GET /api/products?category= — chips visuels only.
const CATEGORY_CHIPS = [
  "Todos los pasteles",
  "Celebración & Cumpleaños",
  "Bodas & Eventos Elegantes",
  "Pasteles de Autor & Tradición",
  "Tartas & Frutas Frescas",
  "Opciones Sin Gluten / Vega",
];

const Products: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useLang();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [activeChip, setActiveChip] = useState<number>(0);
  const productsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchData(lang, currentPage, productsPerPage)
      .then((data: ProductListResponse) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTimeout(() => setLoading(false), 800);
      })
      .catch((err) => {
        setError(err.message);
        setTimeout(() => setLoading(false), 800);
      });
  }, [currentPage, lang]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const atelierLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === "es"
      ? "Hola, tengo una idea especial para un pastel 100% personalizado. ¿Hablamos? ¡Gracias!"
      : "Bonjour, j'ai une idée spéciale pour un gâteau 100% personnalisé. On en parle ? Merci !"
  )}`;

  const steps = [
    { title: t("Step 1 title"), desc: t("Step 1 desc") },
    { title: t("Step 2 title"), desc: t("Step 2 desc") },
    { title: t("Step 3 title"), desc: t("Step 3 desc") },
  ];

  const guides = [
    { Icon: Clock, title: t("Guide 1 title"), desc: t("Guide 1 desc") },
    { Icon: Snowflake, title: t("Guide 2 title"), desc: t("Guide 2 desc") },
    { Icon: Truck, title: t("Guide 3 title"), desc: t("Guide 3 desc") },
  ];

  return (
    <div className="pt-16 bg-cream text-cocoa flex flex-col min-h-screen">
      {/* HEADER */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto pt-8">
        <nav className="flex items-center gap-1.5 text-xs text-cocoa-muted" aria-label="breadcrumb">
          <Link to="/Home" className="hover:text-maroon">{t("Home")}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-cocoa">{t("Products")}</span>
        </nav>
        <p className="mt-4 inline-flex items-center gap-2 bg-blush rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-maroon">
          {t("Catalog badge")}
        </p>
        <div className="mt-3 flex flex-col lg:flex-row justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
              {t("Catalog title")}
            </h1>
            <p className="mt-3 text-cocoa-light leading-relaxed">{t("Catalog description")}</p>
          </div>
          <div className="lg:text-right shrink-0">
            <p className="inline-flex items-center gap-1.5 bg-blush rounded-full px-3 py-1.5 text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-maroon" />
              {t("Fresh orders 48h")}
            </p>
            <p className="mt-2 text-xs text-cocoa-muted">{t("Gluten-free note")}</p>
          </div>
        </div>

        {/* Chips visuels — filtrage serveur en attente du backend */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {CATEGORY_CHIPS.map((chip, index) => (
            <button
              key={chip}
              onClick={() => setActiveChip(index)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                index === activeChip
                  ? "bg-cocoa text-cream"
                  : "bg-blush/60 text-cocoa hover:bg-blush-dark"
              }`}
            >
              {index === 0 ? `${t("All cakes")}` : chip}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto py-8">
        <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs">
          <p className="text-cocoa-light">
            {!loading && !error ? t("Showing creations", { count: products.length }) : t("Loading")}
          </p>
          <p className="inline-flex items-center gap-1.5 font-semibold text-maroon">
            <Leaf className="w-3.5 h-3.5" />
            {t("Natural ingredients")}
          </p>
        </div>

        {loading ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[...Array(productsPerPage)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="mt-6 text-red-500">{error}</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {products.length === 0 && <p>{t("Aucun produit disponible")}</p>}
            {products.map((p) => (
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

        {/* Pagination */}
        {loading ? (
          <PaginationSkeleton />
        ) : (
          <div className="flex justify-center mt-10 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label={t("Previous")}
              className="w-10 h-10 rounded-full bg-blush/60 text-cocoa hover:bg-blush-dark disabled:opacity-40 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full text-sm font-bold transition-colors ${
                  page === currentPage
                    ? "bg-maroon text-cream"
                    : "bg-blush/60 text-cocoa hover:bg-blush-dark"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label={t("Next")}
              className="w-10 h-10 rounded-full bg-blush/60 text-cocoa hover:bg-blush-dark disabled:opacity-40 flex items-center justify-center transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ATELIER */}
      <section className="w-full bg-cream-dark/60 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid gap-8 lg:grid-cols-2 items-center">
          <div className="rounded-card overflow-hidden shadow-card">
            <img src={atelierImage} alt={t("Special idea")} loading="lazy" className="w-full aspect-[4/3] object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-maroon">{t("Custom service")}</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">{t("Special idea")}</h2>
            <p className="mt-3 text-cocoa-light leading-relaxed">{t("Atelier service desc")}</p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {steps.map((step, index) => (
                <div key={step.title} className="bg-cream rounded-cta shadow-card p-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blush font-display font-bold text-maroon text-sm">
                    {index + 1}
                  </span>
                  <p className="mt-2 text-sm font-bold">{step.title}</p>
                  <p className="mt-1 text-xs text-cocoa-light leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href={atelierLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-dark text-cream font-semibold rounded-full px-6 py-3 text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t("Talk to pastry chef")}
              </a>
              <p className="text-xs text-cocoa-muted">{t("Avg response")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDE */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto py-12">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-maroon">{t("Freshness guarantee")}</p>
        <h2 className="mt-2 text-center font-display text-3xl sm:text-4xl font-bold">{t("Guide title")}</h2>
        <p className="mt-2 text-center text-cocoa-light max-w-2xl mx-auto">{t("Guide desc")}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {guides.map(({ Icon, title, desc }) => (
            <article key={title} className="bg-cream rounded-card shadow-card p-6">
              <span className="inline-flex rounded-cta bg-blush p-3">
                <Icon className="w-5 h-5 text-maroon" />
              </span>
              <h3 className="mt-3 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm text-cocoa-light leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="h-8"></div>
    </div>
  );
};

export default Products;
