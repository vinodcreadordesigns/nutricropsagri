import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../../data/hero";

export default function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = heroSlides.length;

  const next = useCallback(() => setI((v) => (v + 1) % n), [n]);
  const prev = useCallback(() => setI((v) => (v - 1 + n) % n), [n]);

  // autoplay
  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [paused, next, n]);

  // preload next slide
  useEffect(() => {
    const im = new Image();
    im.src = heroSlides[(i + 1) % n].image;
  }, [i, n]);

  const s = heroSlides[i];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full bg-deep"
    >
      {/* Banner: same proportions as the design (2539 x 1011) */}
      <div className="relative w-full overflow-hidden min-h-[320px] aspect-[2539/1011] max-md:aspect-auto max-md:h-[70svh]">
        <AnimatePresence initial={false}>
          <motion.img
            key={i}
            src={s.image}
            alt={s.alt}
            width="2539"
            height="1011"
            decoding="async"
            {...(i === 0 ? { fetchpriority: "high" } : {})}
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            aria-live="polite"
          />
        </AnimatePresence>
      </div>

      {/* Green square arrows, centered and overlapping the bottom edge */}
      <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 translate-y-1/2 items-center gap-2">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="grid h-12 w-14 place-items-center bg-primary text-white transition hover:bg-primary-dark sm:h-14 sm:w-16"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="grid h-12 w-14 place-items-center bg-primary text-white transition hover:bg-primary-dark sm:h-14 sm:w-16"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}