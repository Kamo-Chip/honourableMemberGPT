import { Skeleton } from "@/components/ui/skeleton";

export function MessageSkeleton() {
  return (
    <div className="space-y-2 mb-4">
      <Skeleton className="h-4 w-full max-w-[600px] max-sm:max-w-[300px] bg-slate-300" />
      <Skeleton className="h-4 w-full max-w-[600px] max-sm:max-w-[300px] bg-slate-300" />
      <Skeleton className="h-4 w-full max-w-[500px] max-sm:max-w-[200px] bg-slate-300 " />
    </div>
  );
}
