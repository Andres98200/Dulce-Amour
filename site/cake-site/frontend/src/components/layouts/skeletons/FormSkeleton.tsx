import React from "react";
import Skeleton from "../skeletons/Skeleton";

const LoginSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-cardColor p-6 rounded-xl shadow-sm w-full max-w-sm">
        {/* Title */}
        <Skeleton className="h-6 w-1/3 mb-5 mx-auto" />

        <div className="flex flex-col items-center gap-4">
          {/* Email input */}
          <Skeleton className="h-12 w-80 rounded-xl" />

          {/* Password input */}
          <Skeleton className="h-12 w-80 rounded-xl" />

          {/* Button */}
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default LoginSkeleton;
