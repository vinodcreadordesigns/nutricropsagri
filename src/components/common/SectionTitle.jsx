import { motion } from "framer-motion";
import { fadeUp, viewOnce } from "../../utils/animations";

export default function SectionTitle({ label, title, subtitle, align = "center", light = false, as: Tag = "h2" }) {
  const c = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewOnce} className={`mb-10 max-w-3xl ${c}`}>
      {label && <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.25em] ${light ? "text-accent" : "text-primary"}`}>{label}</p>}
      <Tag className={`text-3xl font-semibold leading-tight sm:text-4xl ${light ? "!text-white" : ""}`}>{title}</Tag>
      <span className={`mt-4 block h-[3px] w-16 bg-accent ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle && <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/80" : "text-charcoal/80"}`}>{subtitle}</p>}
    </motion.div>
  );
}
