import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-gray-50">
      <div className="w-full px-4 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-4">Product Details</h1>
        <p className="mb-6">Product ID: {id}</p>
        
        {/* Add your product details content here */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Product Information</h2>
          <p>This is the details page for product: {id}</p>
          {/* Add more product details, images, etc. */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
