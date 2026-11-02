import { motion } from "framer-motion";
import PageHero from "../../components/common/PageHero";
import { Seo } from "../../utils/seo";
import { history } from "../../data/history";
import { viewOnce } from "../../utils/animations";

export default function History() {
  return (
    <>
      <Seo title="Our History | NutriCrops Agriculture" description="The journey of NutriCrops Agriculture - milestones in plant nutrition." path="/about/history" />
      <PageHero title="Our History" crumbs={[{ name: "Home", to: "/" }, { name: "Company Profile", to: "/about" }, { name: "Our History", to: "/about/history" }]} />
      <section className="py-14 md:py-20"><div className="container-x max-w-4xl">
        <ol className="relative border-l-2 border-primary/30 pl-8 md:ml-0">
          {history.map((h, i) => (
            <motion.li key={h.year} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewOnce} transition={{ delay: i * 0.04 }} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white bg-accent ring-2 ring-primary" aria-hidden="true" />
              <p className="font-heading text-2xl font-bold text-primary">{h.year}</p>
              <h2 className="text-xl font-semibold">{h.title}</h2>
              <p className="mt-1 text-charcoal/75">{h.text}</p>
            </motion.li>
          ))}
        </ol>
        <p className="mt-10 text-xs text-charcoal/60">Timeline content is placeholder - edit src/data/history.js</p>
      </div></section>
    </>
  );
}
