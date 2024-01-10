import { Skeleton } from "@/ui-system/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex items-center space-x-4 w-full h-full bg-zinc-300 mb-8 p-4">
      {/* <Skeleton className="h-12 w-12 rounded-full bg-zinc-100" />
      <div className="space-y-2 bg-zinc-300">
        <Skeleton className="h-4 w-[250px] bg-zinc-100" />
        <Skeleton className="h-4 w-[200px] bg-zinc-100" />
      </div> */}
      Loading ...
    </div>
  )
}
