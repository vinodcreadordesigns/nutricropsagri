import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import useMediaQuery from "../../hooks/useMediaQuery";
import { testimonials, testimonialsArePlaceholder } from "../../data/testimonials";

export default function Testimonials() {
  const lg = useMediaQuery("(min-width:1024px)");
  const md = useMediaQuery("(min-width:640px)");
  const per = lg ? 3 : md ? 2 : 1;
  const [i, setI] = useState(0);
  const n = testimonials.length;
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % n), 6000); return () => clearInterval(t); }, [n]);
  const visible = Array.from({ length: per }, (_, k) => testimonials[(i + k) % n]);
  return (
    <section className="py-16 md:py-24" aria-roledescription="carousel" aria-label="Customer reviews">
      <div className="container-x">
        <SectionTitle label="Testimonials" title="What Our Customers Say" />
        <AnimatePresence mode="wait">
          <motion.div key={`${i}-${per}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((t) => (
              <figure key={t.name} className="flex flex-col border border-line bg-white p-7">
                <Quote className="text-accent" size={30} aria-hidden="true" />
                <div className="mt-3 flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, s) => <Star key={s} size={16} className={s < t.rating ? "fill-accent text-accent" : "text-line"} />)}</div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/80">{t.review}</blockquote>
                <figcaption className="mt-5 border-t border-line pt-4"><span className="block font-semibold text-ink">{t.name}</span><span className="text-xs text-charcoal/70">{t.role} - {t.location}</span></figcaption>
              </figure>
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button type="button" aria-label="Previous reviews" onClick={() => setI((v) => (v - 1 + n) % n)} className="border border-primary p-2.5 text-primary transition hover:bg-primary hover:text-white"><ChevronLeft size={18} /></button>
          <button type="button" aria-label="Next reviews" onClick={() => setI((v) => (v + 1) % n)} className="border border-primary p-2.5 text-primary transition hover:bg-primary hover:text-white"><ChevronRight size={18} /></button>
        </div>
        {testimonialsArePlaceholder && <p className="mt-6 text-center text-xs text-charcoal/60">Sample content - replace with genuine customer reviews in src/data/testimonials.js</p>}
      </div>
    </section>
  );
}
