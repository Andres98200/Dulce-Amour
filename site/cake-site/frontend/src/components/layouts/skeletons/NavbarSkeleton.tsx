import Skeleton from "../skeletons/Skeleton";

const NavbarSkeleton = () => {
  return (
    <nav className="bg-roseCustom p-4 w-full fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-32" />
        <div className="hidden md:flex space-x-6 items-center">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
        <Skeleton className="md:hidden h-6 w-6" />
      </div>
    </nav>
  );
};

export default NavbarSkeleton;
