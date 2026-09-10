import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-md bg-blush-dark",
        className
      )}
    />
  );
};

export default Skeleton;
