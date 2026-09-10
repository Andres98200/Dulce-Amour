import React from "react";
import { useTranslation } from "react-i18next";

interface ProductDescriptionProps {
  title?: string;
  price: string | number;
  description?: string;
  onContactClick?: () => void;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  title,
  price,
  description,
  onContactClick,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-4">
        {/* Titre */}
        <h1 className="font-display text-xl sm:text-3xl md:text-2xl font-bold leading-tight text-cocoa">
          {title}
        </h1>

        {/* Prix */}
        <p className="font-display text-lg sm:text-xl font-bold text-maroon">
          {price}€
        </p>

        {/* Description */}
        <p className="text-cocoa-light text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bouton */}
      <button
        onClick={onContactClick}
        className="mt-8 self-center bg-maroon hover:bg-maroon-dark text-cream font-semibold px-6 py-3 rounded-full transition-colors"
      >
        {t("Contact Us")}
      </button>
    </div>
  );
};

export default ProductDescription;
