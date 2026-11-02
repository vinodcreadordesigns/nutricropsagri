import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "../../data/products";
import { blogs } from "../../data/blogs";
import { siteMenuPages } from "../../data/company";

export default function SearchModal({ open, onClose }) {
  const [q, setQ] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    setQ("");
    const t = setTimeout(() => ref.current?.focus(), 50);
    const key = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [open, onClose]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return null;
    const has = (...t) => t.join(" ").toLowerCase().includes(s);
    return {
      Products: products.filter((p) => has(p.name, p.shortDescription, p.category)).slice(0, 6).map((p) => ({ title: p.name, sub: p.shortDescription, to: `/products/${p.slug}` })),
      Blogs: blogs.filter((b) => has(b.title, b.excerpt, b.category)).slice(0, 4).map((b) => ({ title: b.title, sub: b.excerpt, to: `/blog/${b.slug}` })),
      Pages: siteMenuPages.filter((p) => has(p.title, p.text)).map((p) => ({ title: p.title, sub: "", to: p.to })),
    };
  }, [q]);
  const total = results ? Object.values(results).reduce((n, a) => n + a.length, 0) : 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-deep/95 px-4 pt-20 backdrop-blur-sm" onClick={onClose}>
          <div className="mx-auto max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center border-b-2 border-accent bg-white">
              <Search className="ml-4 shrink-0 text-primary" size={20} aria-hidden="true" />
              <input ref={ref} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, blogs, pages..." aria-label="Search the website" className="w-full px-4 py-4 text-base outline-none" />
              <button type="button" onClick={onClose} aria-label="Close search" className="p-4 text-charcoal hover:text-primary"><X size={20} /></button>
            </div>
            <div className="mt-2 max-h-[65vh] overflow-y-auto bg-white" aria-live="polite">
              {!results && <p className="p-5 text-sm text-charcoal/70">Type at least 2 characters to search.</p>}
              {results && total === 0 && <p className="p-5 text-sm text-charcoal/70">No results found for "{q}".</p>}
              {results && Object.entries(results).map(([group, items]) => items.length > 0 && (
                <div key={group} className="border-b border-line p-3">
                  <h2 className="px-2 pb-1 text-xs font-semibold uppercase tracking-widest text-primary">{group}</h2>
                  <ul>{items.map((it) => (
                    <li key={it.to}><Link to={it.to} onClick={onClose} className="block px-2 py-2 hover:bg-mist"><span className="block text-sm font-semibold text-ink">{it.title}</span>{it.sub && <span className="line-clamp-1 text-xs text-charcoal/70">{it.sub}</span>}</Link></li>
                  ))}</ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
