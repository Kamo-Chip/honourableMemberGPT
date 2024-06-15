import { Skeleton } from "@/components/ui/skeleton";

export function MessageSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full max-w-[600px] bg-slate-200" />
      <Skeleton className="h-4 w-full max-w-[550px] bg-slate-200" />
      <Skeleton className="h-4 w-full max-w-[500px] bg-slate-200 " />
    </div>
  );
}
