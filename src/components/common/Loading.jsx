export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-line ${className}`} aria-hidden="true" />;
}
export default function Loading() {
  return (
    <div className="container-x py-40" role="status" aria-live="polite">
      <Skeleton className="mb-4 h-10 w-1/2" />
      <Skeleton className="mb-3 h-4 w-full" />
      <Skeleton className="mb-3 h-4 w-5/6" />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="aspect-square" />)}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
