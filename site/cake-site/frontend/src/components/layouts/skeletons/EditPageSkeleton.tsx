import React from "react";
import Skeleton from "../skeletons/Skeleton";

const EditPageSkeleton: React.FC = () => {
  return (
    <li className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
      {/* Title */}
      <Skeleton className="h-6 w-2/3 mb-3 mx-auto" />

      {/* Price */}
      <Skeleton className="h-5 w-1/4 mx-auto mb-6" />

      {/* Buttons */}
      <div className="flex mt-auto gap-2 flex-wrap justify-center">
        <Skeleton className="h-8 w-16 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </li>
  );
};

export default EditPageSkeleton;
