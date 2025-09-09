import React from "react";
import { useTranslation } from "react-i18next";

interface ProductDescriptionProps {
  title?: string;
  price: string;
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
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold leading-tight">
          {title}
        </h1>

        {/* Prix */}
        <p className="text-lg sm:text-xl font-semibold text-gray-800">
          {price}€
        </p>

        {/* Description */}
        <p className="text-gray-700 text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bouton */}
      <button
        onClick={onContactClick}
        className="mt-8 self-center bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl transition"
      >
        {t("Contact Us")}
      </button>
    </div>
  );
};

export default ProductDescription;
