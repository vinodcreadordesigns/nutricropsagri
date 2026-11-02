import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { breadcrumbLd } from "../../utils/seo";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mt-4">
      <Helmet><script type="application/ld+json">{JSON.stringify(breadcrumbLd(items))}</script></Helmet>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-white/80">
        {items.map((it, i) => (
          <li key={it.to} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {i === items.length - 1 ? <span aria-current="page" className="text-accent">{it.name}</span> : <Link to={it.to} className="hover:text-white">{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
