import ProductCard from "./ProductCard";
export default function ProductGrid({ items }) {
  if (!items.length) return <p className="py-12 text-center text-charcoal/70">No products found. Try another category or search term.</p>;
  return (
    <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
    </div>
  );
}
