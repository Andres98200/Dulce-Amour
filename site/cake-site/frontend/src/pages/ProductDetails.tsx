import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductbyId } from "../services/api";
import testCake from "../assets/testCake.jpg";
import ProductDescription from "../components/layouts/ProductDetailCard";
import ProductDescriptionSkeleton from "../components/layouts/skeletons/ProductSkeleton";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getProductbyId(id)
        .then((data) => {
          setTimeout(() => {
            setProduct(data);
            setLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  const images = product?.images?.length
    ? product.images.map((img: any) => img.url)
    : [testCake];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8 pt-20">
      <div className="max-w-6xl w-full bg-cardColor rounded-xl shadow-md flex flex-col md:flex-row gap-8 p-8">
        
        {/* Carrousel d'images */}
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
              {images.map((url: string, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    src={url}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Description produit */}
        <div className="md:w-1/2 flex flex-col justify-center">
          {loading ? (
            <ProductDescriptionSkeleton />
          ) : (
            <ProductDescription
              title={product.title}
              price={product.price}
              description={product.description}
              onContactClick={() => alert("Contactez-nous")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
