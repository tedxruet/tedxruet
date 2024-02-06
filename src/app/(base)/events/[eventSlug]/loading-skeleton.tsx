import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => (
  <>
    <div>
      <Skeleton className="h-52" />
      <div className="py-6">
        <Skeleton className="h-7 mb-4 w-1/3" />
        <Skeleton className="h-4 mb-2 w-3/4" />
        <Skeleton className="h-4 mb-8 w-[70%]" />
        <Skeleton className="h-10 w-36" />
      </div>
    </div>
  </>
);
