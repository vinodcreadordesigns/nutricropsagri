import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { stats } from "../../data/company";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString("en-IN")}{suffix}</span>;
}
export default function Stats() {
  return (
    <section className="relative isolate bg-deep py-14 text-white" aria-label="Company statistics">
      <div className="absolute inset-0 -z-10 bg-[url('/images/hero-2.svg')] bg-cover opacity-15" aria-hidden="true" />
      <div className="container-x grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-heading text-4xl font-bold text-accent sm:text-5xl"><Counter value={s.value} suffix={s.suffix} /></p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
