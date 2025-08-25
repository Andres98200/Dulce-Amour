import Skeleton from "../skeletons/Skeleton";

const PaginationSkeleton = () => {
  return (
    <div className="flex justify-center mt-8 gap-2">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-10 w-12 rounded" />
      ))}
    </div>
  );
};

export default PaginationSkeleton;
