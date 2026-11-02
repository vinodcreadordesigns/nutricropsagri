import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageHero from "../components/common/PageHero";
import Img from "../components/common/Img";
import { Seo } from "../utils/seo";
import { gallery, galleryCategories } from "../data/gallery";

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);
  const items = cat === "All" ? gallery : gallery.filter((g) => g.category === cat);
  const step = useCallback((d) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);
  useEffect(() => {
    if (open === null) return;
    const k = (e) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, step]);
  return (
    <>
      <Seo title="Gallery | NutriCrops Agriculture" description="Photos of NutriCrops products, manufacturing, agriculture, events and team." path="/gallery" />
      <PageHero title="Gallery" subtitle="A look at our products, manufacturing, fields and events." crumbs={[{ name: "Home", to: "/" }, { name: "Gallery", to: "/gallery" }]} />
      <section className="py-14 md:py-20"><div className="container-x">
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery">
          {galleryCategories.map((c) => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${cat === c ? "bg-primary text-white" : "bg-line/70 hover:bg-primary/10"}`}>{c}</button>)}
        </div>
        <motion.ul layout className="columns-1 gap-4 min-[480px]:columns-2 lg:columns-3">
          <AnimatePresence>
            {items.map((g, i) => (
              <motion.li layout key={g.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4 break-inside-avoid">
                <button type="button" onClick={() => setOpen(i)} aria-label={`Open ${g.title}`} className="group relative block w-full overflow-hidden">
                  <Img src={g.src} alt={g.title} width={800} height={600} className="h-auto w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-full bg-deep/85 p-3 text-left text-sm font-semibold text-white transition group-hover:translate-y-0">{g.title}</span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div></section>
      <AnimatePresence>
        {open !== null && items[open] && (
          <motion.div role="dialog" aria-modal="true" aria-label={items[open].title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" onClick={() => setOpen(null)}>
            <button type="button" autoFocus onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 p-2 text-white"><X size={28} /></button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image" className="absolute left-2 p-2 text-white sm:left-6"><ChevronLeft size={36} /></button>
            <img src={items[open].src} alt={items[open].title} className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image" className="absolute right-2 p-2 text-white sm:right-6"><ChevronRight size={36} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
