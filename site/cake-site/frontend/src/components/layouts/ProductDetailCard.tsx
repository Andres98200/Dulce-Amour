import React from "react";
import { useTranslation } from "react-i18next";

interface ProductDescriptionProps {
  title: string;
  price: number;
  description: string;
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
      <div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl font-semibold text-black-600 mb-6">{price}€</p>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      <button
        onClick={onContactClick}
        className="mt-8 self-center bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl transition justify-center"
      >
        {t("Contact Us")}
      </button>
    </div>
  );
};

export default ProductDescription;
