import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import testCake from "../../assets/testCake.jpg"

interface ProductCardProps {
  id?: string;
  title?: string;
  price: string;
  description?: string;
  image?: string;
  badge?: string;
  ratingText?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  description,
  image,
  badge,
  ratingText,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);

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
      className="bg-cream rounded-card shadow-card flex flex-col flex-shrink-0 overflow-hidden transition-transform duration-200 hover:scale-[1.02] w-full cursor-pointer"
      onClick={handleCardClick}
    >
    {image && (
      <div className="relative overflow-hidden flex-shrink-0 aspect-square">
        <img
          src={image || testCake}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = testCake;
          }}
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-maroon text-cream text-[11px] font-bold uppercase tracking-wide rounded-full px-3 py-1">
            {badge}
          </span>
        )}
        <button
          type="button"
          aria-label="favorite"
          aria-pressed={isFavorite}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 rounded-full p-2 bg-cream/90 shadow-card hover:scale-110 transition"
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? "fill-maroon text-maroon" : "text-cocoa"}`}
          />
        </button>
      </div>
    )}

      <div className="flex flex-col gap-1 p-4">
        {ratingText && (
          <p className="text-xs font-semibold text-maroon">★ {ratingText}</p>
        )}
        <span className="font-display text-lg font-bold leading-snug">{title}</span>

        {description && (
          <p className="text-sm text-cocoa-light leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        <div className="mt-2 flex justify-between items-center">
          <span className="font-display text-lg font-bold text-maroon">{price}€</span>
          <span className="inline-flex items-center gap-1 bg-blush text-cocoa text-sm font-semibold rounded-full px-4 py-1.5">
            {t("Order")}
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
   </div>
  );
};

export default ProductCard;
