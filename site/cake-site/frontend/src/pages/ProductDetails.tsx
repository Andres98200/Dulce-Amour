import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductbyId } from "../services/api";
import testCake from "../assets/testCake.jpg";
import ProductDescription from "../components/layouts/ProductDetailCard";
import ProductDescriptionSkeleton from "../components/layouts/skeletons/ProductSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useLang } from "../context/LangContext";
import type { Product } from "../types/Product";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useLang();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getProductbyId(id, lang)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, lang]); // re-fetch si la langue change

  const images = product?.images?.length
    ? product.images.map((img) => img.url)
    : [testCake];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8 pt-20">
      <div className="max-w-6xl w-full bg-cardColor rounded-xl shadow-md flex flex-col md:flex-row gap-4 p-4">
        
        {/* Carrousel */}
        <div className="md:w-1/2">
          {loading ? (
            <div className="w-full h-80 bg-slate-200 animate-pulse rounded-xl" />
          ) : (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              slidesPerView={1}
              className="rounded-xl"
            >
              {images.map((url, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={url}
                    alt={`${product?.title || "Product"} ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Description */}
        <div className="md:w-1/2 flex flex-col justify-center">
          {loading ? (
            <ProductDescriptionSkeleton />
          ) : (
            <ProductDescription
              title={product?.title}
              price={product?.price ?? 0}
              description={product?.description}
              onContactClick={() => {
                const phone = "33761557413";
                const message = lang === "es"
                  ? `Buenos Dias, estoy interesado en el ${product?.title}, precio de ${product?.price}€. ¿Podría darme más información? Muchas Gracias.`
                  : `Bonjour, je suis intéressé par le ${product?.title}, prix de ${product?.price}€. Pouvez-vous m'en dire plus ? Merci Beaucoup.`;
                const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(url, "_blank");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
