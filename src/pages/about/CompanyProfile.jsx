import { motion } from "framer-motion";
import { Eye, Target, Gem, ShieldCheck, Lightbulb, Leaf } from "lucide-react";
import PageHero from "../../components/common/PageHero";
import Img from "../../components/common/Img";
import SectionTitle from "../../components/common/SectionTitle";
import CtaBand from "../../components/common/CtaBand";
import { Seo } from "../../utils/seo";
import { fadeUp, stagger, viewOnce } from "../../utils/animations";

const cards = [
  [Eye, "Vision", "Placeholder: write the company vision here."],
  [Target, "Mission", "Placeholder: write the company mission here."],
  [Gem, "Values", "Placeholder: list the core values here."],
];
const pillars = [[ShieldCheck, "Quality", "Placeholder: describe your quality approach."], [Lightbulb, "Innovation", "Placeholder: describe your innovation approach."], [Leaf, "Sustainability", "Placeholder: describe your sustainability approach."]];

export default function CompanyProfile() {
  return (
    <>
      <Seo title="Company Profile | NutriCrops Agriculture" description="Learn about NutriCrops Agriculture - our vision, mission, values and commitment to quality plant nutrition." path="/about" />
      <PageHero title="Company Profile" crumbs={[{ name: "Home", to: "/" }, { name: "Company Profile", to: "/about" }]} />
      <section className="py-14 md:py-20"><div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-charcoal/85">
          <h2 className="text-3xl font-semibold">NutriCrops Agriculture</h2><span className="block h-[3px] w-16 bg-accent" />
          <p>Placeholder introduction. Replace this with the company's introduction: when and where it was established, what it manufactures, the regions it serves and its approach to plant nutrition.</p>
          <p>Add certifications, awards or export information here only once verified.</p>
        </div>
        <Img src="/images/about.svg" alt="NutriCrops agriculture and crop field" width={900} height={700} className="h-auto w-full" />
      </div></section>
      <section className="bg-mist py-14 md:py-20"><div className="container-x">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewOnce} className="grid gap-5 md:grid-cols-3">
          {cards.map(([I, t, x]) => <motion.div key={t} variants={fadeUp} className="border-4 border-primary/50 bg-white p-6"><I className="text-primary" size={30} aria-hidden="true" /><h3 className="mt-3 text-2xl font-medium">{t}</h3><p className="mt-2 text-sm text-charcoal/80">{x}</p></motion.div>)}
        </motion.div>
      </div></section>
      <section className="py-14 md:py-20"><div className="container-x">
        <SectionTitle label="Our Approach" title="Quality, Innovation & Sustainability" />
        <div className="grid gap-5 md:grid-cols-3">{pillars.map(([I, t, x]) => <div key={t} className="border border-line p-6 text-center"><I className="mx-auto text-primary" size={34} aria-hidden="true" /><h3 className="mt-3 text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-charcoal/75">{x}</p></div>)}</div>
      </div></section>
      <CtaBand />
    </>
  );
}
