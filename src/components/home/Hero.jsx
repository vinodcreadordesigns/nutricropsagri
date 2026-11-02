import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../../data/hero";

const AUTOPLAY_MS = 5000; // har image 5 second dikhegi (badal sakte ho)
const SLIDE_EASE = [0.22, 1, 0.36, 1];

const slideVariants = {
  enter: (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 1 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d > 0 ? "-25%" : "25%", opacity: 0 }),
};

export default function Hero() {
  const n = heroSlides.length;
  const reduce = useReducedMotion();
  const [[i, dir], setSlide] = useState([0, 1]);
  const [hovered, setHovered] = useState(false); // sirf mouse hover par pause
  const [dragging, setDragging] = useState(false);
  const [hidden, setHidden] = useState(false);

  const paused = hovered || dragging || hidden;

  const go = useCallback((d) => setSlide(([v]) => [(v + d + n) % n, d]), [n]);
  const goTo = (idx) =>
    setSlide(([v]) => (idx === v ? [v, 1] : [idx, idx > v ? 1 : -1]));

  // Auto scroll: har slide ke baad apne aap agli image
  useEffect(() => {
    if (paused || n < 2) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [i, paused, n, go]);

  // Tab background me ho to autoplay band
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Agli aur pichhli slide preload
  useEffect(() => {
    [(i + 1) % n, (i - 1 + n) % n].forEach((k) => {
      const im = new Image();
      im.src = heroSlides[k].image;
    });
  }, [i, n]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const onDragEnd = (_, { offset, velocity }) => {
    setDragging(false);
    if (offset.x < -80 || velocity.x < -500) go(1);
    else if (offset.x > 80 || velocity.x > 500) go(-1);
  };

  const s = heroSlides[i];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      tabIndex={0}
      onKeyDown={onKeyDown}
      // Sirf mouse hover par pause (touch/click par autoplay band nahi hoga)
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      className="relative w-full bg-deep outline-none"
    >
      <div className="relative aspect-[2539/1011] min-h-[320px] w-full overflow-hidden max-md:aspect-auto max-md:h-[70svh]">
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={i}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: reduce ? 0 : 0.9,
              ease: SLIDE_EASE,
              opacity: { duration: reduce ? 0 : 0.6 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragStart={() => setDragging(true)}
            onDragEnd={onDragEnd}
            className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}`}
          >
            <motion.img
              src={s.image}
              alt={s.alt}
              width="2539"
              height="1011"
              decoding="async"
              draggable={false}
              {...(i === 0 ? { fetchPriority: "high" } : {})}
              className="h-full w-full select-none object-cover object-center"
              initial={{ scale: reduce ? 1 : 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: reduce ? 0 : AUTOPLAY_MS / 1000, ease: "easeOut" }}
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent"
          aria-hidden="true"
        />

        {/* Auto scroll progress bar: bar poori bharte hi agli image aati hai */}
        {n > 1 && !paused && (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 z-10 h-1 w-full origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            aria-hidden="true"
          />
        )}

        {/* Dots + counter */}
        {n > 1 && (
          <div className="absolute bottom-5 right-4 z-10 flex items-center gap-3 sm:right-8">
            <span className="hidden text-xs font-semibold tabular-nums text-white/90 sm:block">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
              {heroSlides.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={k === i}
                  aria-label={`Go to slide ${k + 1}`}
                  onClick={() => goTo(k)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    k === i ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Green square arrows */}
      {n > 1 && (
        <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 translate-y-1/2 items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="grid h-12 w-14 place-items-center bg-primary text-white transition hover:bg-primary-dark active:scale-95 sm:h-14 sm:w-16"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="grid h-12 w-14 place-items-center bg-primary text-white transition hover:bg-primary-dark active:scale-95 sm:h-14 sm:w-16"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}