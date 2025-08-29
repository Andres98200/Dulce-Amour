import Skeleton from "../skeletons/Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-cardColor rounded-xl shadow-md overflow-hidden p-4 flex flex-col">
      {/* Image */}
      <Skeleton className="w-full h-48 mb-4 rounded-lg" />

      {/* Title + Price */}
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
