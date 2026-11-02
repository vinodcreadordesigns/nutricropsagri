import { Search } from "lucide-react";
import { categories } from "../../data/categories";

export default function ProductFilter({ category, onCategory, query, onQuery }) {
  const chip = (active) => `px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${active ? "bg-primary text-white" : "bg-line/70 text-charcoal hover:bg-primary/10"}`;
  return (
    <div className="mb-10 space-y-5">
      <div className="relative mx-auto max-w-md">
        <label htmlFor="product-search" className="sr-only">Search products</label>
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" aria-hidden="true" />
        <input id="product-search" type="search" value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Search products..." className="input pl-10" />
      </div>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
        <button type="button" aria-pressed={!category} onClick={() => onCategory("")} className={chip(!category)}>All</button>
        {categories.map((c) => <button key={c.slug} type="button" aria-pressed={category === c.slug} onClick={() => onCategory(c.slug)} className={chip(category === c.slug)}>{c.name}</button>)}
      </div>
    </div>
  );
}
