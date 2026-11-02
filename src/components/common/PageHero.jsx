import { motion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs";

export default function PageHero({ title, subtitle, crumbs }) {
  return (
    <section className="relative isolate overflow-hidden bg-deep pb-12 pt-36 text-white lg:pt-44">
      <div className="absolute inset-0 -z-10 bg-[url('/images/hero-3.svg')] bg-cover bg-center opacity-25" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep via-deep/80 to-deep/40" aria-hidden="true" />
      <div className="container-x">
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-semibold !text-white sm:text-4xl lg:text-5xl">{title}</motion.h1>
        <span className="mt-4 block h-[3px] w-16 bg-accent" />
        {subtitle && <p className="mt-4 max-w-2xl text-white/80">{subtitle}</p>}
        {crumbs && <Breadcrumbs items={crumbs} />}
      </div>
    </section>
  );
}
