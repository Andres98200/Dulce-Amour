import React from "react";
import { useNavigate } from "react-router-dom";
import testCake from "../../assets/testCake.jpg"
interface ProductCardProps {
  id?: string;
  title?: string;
  price: string;
  description?: string;
  image?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (id) {
      navigate(`/product/${id}`, {
        state: {
          product: { id, title, image, price },
        },
      });
    }
  };
  

    return (
    <div
      aria-label={`${title} - ${price}€`}
      className=" rounded-xl flex flex-col flex-shrink-0 overflow-hidden transition-transform duration-200 hover:scale-[1.02] w-full cursor-pointer "
      onClick={handleCardClick}
    >
    {image && (
      <div className="rounded-lg overflow-hidden mb-2 flex-shrink-0 aspect-[3/3]">
        <img
          src={image || testCake}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = testCake;
          }}
        />
      </div>
    )}

     <div className="flex justify-between items-center">
      <span className="font-bold text-lg">{title}</span>
      <span className="font-bold text">{price}€</span>
    </div>

    {/* <p className="text-sm leading-relaxed">
      {description}
    </p> */}
  </div>
  );
};

export default ProductCard;
