import React from "react";
import Skeleton from "./Skeleton";

const ProductDescriptionSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div>
        {/* Title */}
        <Skeleton className="h-8 w-3/4 mb-4" />

        {/* Price */}
        <Skeleton className="h-6 w-1/4 mb-6" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Button */}
      <div className="mt-8 self-center">
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
    </div>
  );
};

export default ProductDescriptionSkeleton;
