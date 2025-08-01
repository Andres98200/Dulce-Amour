import React from "react";
import instagram from "../../assets/icons/instagram.png";

interface ProductCardProps {
  title: string;
  price: number;
  description: string;
  image?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  description,
  image,
}) => (
  <div
    aria-label={`${title} - ${price}£`}
    className="bg-[#FFF8F0] rounded-xl shadow-md p-4 flex flex-col flex-shrink-0 overflow-hidden transition-transform duration-200 hover:scale-[1.02] w-full"
  >
    {image && (
      <div className="rounded-lg overflow-hidden mb-3 flex-shrink-0">
        <img
          src={instagram}
          alt={title}
          loading="lazy"
          className="w-full h-56 object-cover"
        />
      </div>
    )}

    <div className="flex justify-between items-center mt-1 mb-1">
      <span className="font-bold text-base">{title}</span>
      <span className="font-bold text-base">{price} £</span>
    </div>

    <p className="text-xs leading-tight flex-1">
      {description}
    </p>
  </div>
);

export default ProductCard;
