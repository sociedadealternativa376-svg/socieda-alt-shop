import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden gradient-border">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 md:p-4 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="hidden md:block h-4 w-3/4" />
        <div className="flex items-center justify-between mt-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
