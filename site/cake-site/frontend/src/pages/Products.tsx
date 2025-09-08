import React, { useEffect, useState } from "react";
import ProductCard from "../components/layouts/ProductCard";
import ProductCardSkeleton from "../components/layouts/skeletons/CardSkeleton";
import PaginationSkeleton from "../components/layouts/skeletons/PaginationSkeleton";
import type { Product } from "../types/Product";
import type { ProductListResponse } from "../types/Product";
import { fetchData } from "../services/api";
import { useTranslation } from "react-i18next";
import { useLang } from "../context/LangContext";

const Products: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useLang(); 

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
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

  return (
    <div className="pt-20 bg-gray-50 flex flex-col min-h-screen">
      <div className="w-full px-8 mx-auto">
        <h1 className="pt-5 text-3xl font-bold mb-4 text-left">
          {t("All of our Cakes")}
        </h1>

        {/* Produits */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {[...Array(productsPerPage)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="h1 text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {products.length === 0 && <p className="">{t("Aucun produit disponible")}</p>}
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
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              {t("Previous")}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
                  page === currentPage
                    ? "bg-roseCustom text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-30"
            >
              {t("Next")}
            </button>
          </div>
        )}
      </div>

      <div className="h-16"></div>
    </div>
  );
};

export default Products;
