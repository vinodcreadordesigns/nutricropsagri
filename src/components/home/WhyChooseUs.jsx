import { motion } from "framer-motion";
import { BadgeCheck, FlaskConical, Microscope, Sprout, Headset, Leaf } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import { whyChoose } from "../../data/company";
import { fadeUp, stagger, viewOnce } from "../../utils/animations";

const icons = { BadgeCheck, FlaskConical, Microscope, Sprout, Headset, Leaf };
export default function WhyChooseUs() {
  return (
    <section className="bg-mist py-16 md:py-24">
      <div className="container-x">
        <SectionTitle label="Why Us" title="Why Choose NutriCrops?" subtitle="Built around quality, research and the needs of farmers." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewOnce} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((w, i) => {
            const I = icons[w.icon];
            return (
              <motion.div key={w.title} variants={fadeUp} className="relative border border-line border-t-4 border-t-primary bg-white p-7 transition hover:border-t-accent">
                <span className="absolute right-5 top-4 font-heading text-5xl font-bold text-primary/10">{String(i + 1).padStart(2, "0")}</span>
                <I size={34} className="text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{w.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
