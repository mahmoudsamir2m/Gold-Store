export default function ProductCardSkeleton() {
  return (
    <div className="w-82 rounded-xl border border-gray-200 animate-pulse">
      {/* Image */}
      <div className="h-56 w-full bg-gray-200 rounded-t-xl" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />

        <div className="flex gap-2">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}
