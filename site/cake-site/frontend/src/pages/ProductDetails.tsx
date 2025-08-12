import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductbyId } from "../services/api";
import testCake from "../assets/testCake.jpg";
import ProductDescription from "../components/layouts/ProductDetailCard";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getProductbyId(id)
        .then((data) => setProduct(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!product) {
    return <div className="pt-20 text-center">Chargement...</div>;
  }

  const imageUrl = product.images?.[0]?.url || testCake;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8 pt-20">
      <div className="max-w-6xl w-full bg-cardColor rounded-xl shadow-md flex flex-col md:flex-row gap-8 p-8">
        
        {/* Image */}
        <div className="md:w-2/2">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Texte produit avec composant */}
        <div className="md:w-1/2 flex flex-col justify-center ">
          <ProductDescription
            title={product.title}
            price={product.price}
            description={product.description}
            onContactClick={() => alert("Contactez-nous")}
          />
        </div>

      </div>
    </div>
  );
}
