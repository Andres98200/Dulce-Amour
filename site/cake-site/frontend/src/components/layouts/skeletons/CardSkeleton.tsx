import Skeleton from "../skeletons/Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-cream rounded-card shadow-card overflow-hidden p-4 flex flex-col">
      {/* Image */}
      <Skeleton className="w-full aspect-square mb-4 rounded-t-card" />

      {/* Title */}
      <Skeleton className="h-6 w-2/3 mb-2" />

      {/* Description */}
      <Skeleton className="h-4 w-full mb-4" />

      {/* Price + Button */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
