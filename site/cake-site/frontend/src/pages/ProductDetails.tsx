import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import PresentationCard from "../components/layouts/PresentationCard";
import { getProductbyId } from "../services/api";
import ProductCard from "../components/layouts/ProductCard";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { product: stateProduct } = location.state || {};
  const [product, setProduct] = useState(stateProduct || null);

  useEffect(() => {
    if (!product && id) {
      getProductbyId(id).then(setProduct).catch(console.error);
    }
  }, [id, product]);

  if (!product) {
    return <div className="pt-20 text-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8 pt-20">
      <div className="max-w-7xl flex flex-col md:flex-row gap-8 p-8">
        {/* Image à gauche */}
        <div className=" flex justify-center items-center">
          <ProductCard image={product.image} />
        </div>

        {/* Infos à droite */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl font-semibold mb-6">{product.price} £</p>
            <p className="mb-6 text-gray-700">{product.description}</p>
          </div>

          <button
            onClick={() => alert("Contactez-nous à contact@votresite.com")}
            className="justify-center bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Nous contacter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
