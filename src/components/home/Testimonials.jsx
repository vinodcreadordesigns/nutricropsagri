import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import { testimonials, testimonialsArePlaceholder } from "../../data/testimonials";

const AUTOPLAY_MS = 4000; // har kitni der me agla review (badal sakte ho)
// Apna Google review link yahan daalo (khali hai to button nahi dikhega)
const GOOGLE_REVIEW_URL = "";

const AVATAR_COLORS = [
  "bg-[#4285F4]",
  "bg-[#EA4335]",
  "bg-[#34A853]",
  "bg-[#F9AB00]",
  "bg-[#8E4A9E]",
  "bg-[#1F8A70]",
];

function GoogleG({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" />
      <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2 1.4-4.9 2.3-8.5 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function Stars({ rating, size = 16 }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, s) => (
        <Star
          key={s}
          size={size}
          aria-hidden="true"
          className={s < Math.round(rating) ? "fill-[#FBBC04] text-[#FBBC04]" : "fill-transparent text-line"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ t, index }) {
  const [open, setOpen] = useState(false);
  const long = (t.review || "").length > 150;
  const initial = (t.name || "?").trim().charAt(0).toUpperCase();

  return (
    <figure className="flex h-full flex-col rounded-xl border border-line bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
      <div className="flex items-start gap-3">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg font-semibold text-white ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
          aria-hidden="true"
        >
          {initial}
        </span>
        <div className="min-w-0 flex-1">
          <figcaption className="truncate font-semibold text-ink">{t.name}</figcaption>
          <p className="truncate text-xs text-charcoal/70">
            {[t.role, t.location].filter(Boolean).join(" - ")}
          </p>
        </div>
        <GoogleG />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Stars rating={t.rating} />
        <svg width="14" height="14" viewBox="0 0 24 24" aria-label="Verified" role="img">
          <circle cx="12" cy="12" r="12" fill="#4285F4" />
          <path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <blockquote
        className={`mt-3 text-sm leading-relaxed text-charcoal/80 ${open ? "" : "line-clamp-5"}`}
      >
        {t.review}
      </blockquote>

      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-2 self-start text-sm font-medium text-[#1a73e8] hover:underline"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </figure>
  );
}

export default function Testimonials() {
  const n = testimonials.length;
  const scroller = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const avg = n ? testimonials.reduce((a, t) => a + (Number(t.rating) || 0), 0) / n : 0;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  // Ek card ka step (card width + gap)
  const getStep = () => {
    const el = scroller.current;
    const first = el?.firstElementChild;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  };

  const scrollByCard = useCallback((dir) => {
    const el = scroller.current;
    if (!el) return;
    const step = getStep();
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir < 0 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  // Auto scroll
  useEffect(() => {
    if (hovered || reduceMotion || n < 2) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      scrollByCard(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [hovered, reduceMotion, n, scrollByCard]);

  const onScroll = () => {
    const el = scroller.current;
    const step = getStep();
    if (!el || !step) return;
    setActive(Math.min(n - 1, Math.round(el.scrollLeft / step)));
  };

  const goTo = (k) => {
    const el = scroller.current;
    if (el) el.scrollTo({ left: k * getStep(), behavior: "smooth" });
  };

  if (!n) return null;

  return (
    <section className="bg-[#f8f9fa] py-16 md:py-24" aria-roledescription="carousel" aria-label="Google reviews">
      <div className="container-x">
        <SectionTitle label="Testimonials" title="What Our Customers Say" />

        {/* Google rating summary */}
        <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-4 rounded-xl border border-line bg-white px-6 py-5 shadow-sm sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <GoogleG size={38} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-charcoal">Google Reviews</p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-3xl font-bold leading-none text-ink">{avg.toFixed(1)}</span>
                <Stars rating={avg} size={18} />
              </div>
              <p className="mt-1 text-xs text-charcoal/70">Based on {n} reviews</p>
            </div>
          </div>
          {GOOGLE_REVIEW_URL && (
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#1a73e8] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1557b0]"
            >
              Write a review
            </a>
          )}
        </div>

        {/* Slider */}
        <div
          className="relative"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
        >
          <div
            ref={scroller}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t, k) => (
              <div
                key={`${t.name}-${k}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${k + 1} of ${n}`}
                className="w-[88%] flex-none snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              >
                <ReviewCard t={t} index={k} />
              </div>
            ))}
          </div>

          {/* Arrows: laptop/desktop par side me */}
          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => scrollByCard(-1)}
            className="absolute -left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-charcoal shadow-md transition hover:bg-primary hover:text-white lg:grid"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next reviews"
            onClick={() => scrollByCard(1)}
            className="absolute -right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-charcoal shadow-md transition hover:bg-primary hover:text-white lg:grid"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots + mobile arrows */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => scrollByCard(-1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-primary text-primary transition hover:bg-primary hover:text-white lg:hidden"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, k) => (
              <button
                key={k}
                type="button"
                aria-label={`Go to review ${k + 1}`}
                aria-current={k === active}
                onClick={() => goTo(k)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  k === active ? "w-6 bg-primary" : "w-2 bg-charcoal/25 hover:bg-charcoal/50"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next reviews"
            onClick={() => scrollByCard(1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-primary text-primary transition hover:bg-primary hover:text-white lg:hidden"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {testimonialsArePlaceholder && (
          <p className="mt-6 text-center text-xs text-charcoal/60">
            Sample content - replace with genuine customer reviews in src/data/testimonials.js
          </p>
        )}
      </div>
    </section>
  );
}