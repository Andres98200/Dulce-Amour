import React, { useEffect, useState } from "react";
import ProductCard from "../components/layouts/ProductCard";
import type { Product } from "../types/Product";
import { fetchData } from "../services/api";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then(prods => {
        setProducts(prods);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement des produits...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-gray-50">
      <div className="w-full px-8 mx-auto">
        <h1 className="pt-5 text-3xl font-bold mb-4 text-left">
          All of our Cakes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {products.length === 0 && <p>Aucun produit disponible</p>}
          {products.map(p => (
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
      </div>
      <div className="h-16"></div>
    </div>
  );
  
};

export default Products;
