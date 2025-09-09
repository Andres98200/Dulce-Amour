import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/layouts/ProductCard";
import PresentationCard from "../components/layouts/PresentationCard";
import type { Product } from "../types/Product";
import { getProductbyId } from "../services/api";
import testCake from "../assets/testCake.jpg";
import { useTranslation } from "react-i18next";
import ProductCardSkeleton from "../components/layouts/skeletons/CardSkeleton";
import { useLang } from "../context/LangContext";

const featureKeys = ["feature_1", "feature_2", "feature_3", "feature_4"];

export default function Home() {
  const navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const { lang } = useLang();

  useEffect(() => {
    const bestSellersIds = ["1", "2", "3", "4"];
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

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-gray-50">
      <div className="w-full px-8">
        {/* Section best sellers */}
        <h1 className="pt-5 text-3xl font-bold mb-4 text-left">
          {t("Our Best Sellers")}
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
            {[...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="h1 text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
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
            className="w-full max-w-[280px] bg-pink-400 hover:bg-pink-500 text-white font-semibold transition duration-300 py-3 rounded-xl"
          >
            {t("See all products")}
          </button>
        </div>

        {/* Section présentation / features */}
        <div className="mt-16">
          <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start">
            {/* Carte présentation */}
            <div className="hidden xl:block xl:w-1/3">
              <PresentationCard image={testCake} />
            </div>

            {/* Contenu texte */}
            <div className="w-full xl:w-2/3 flex flex-col xl:items-start">
              <h1 className="pt-5 text-3xl font-bold mb-4 text-left">
                {t("Why Choose our boutique ?")}
              </h1>

              <p className="mb-6 ">{t("boutique_description")}</p>

              {/* Feature cards */}
              <div className="flex flex-col gap-6">
                {featureKeys.map((key, index) => (
                  <div key={index} className="flex items-center gap-5">
                    <div className="bg-cardColor rounded-xl shadow-md p-3 flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-2xl">
                      {index + 1}
                    </div>
                    <p className="text-sm flex-1 semi-bold">{t(key)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16"></div>
    </div>
  );
}
