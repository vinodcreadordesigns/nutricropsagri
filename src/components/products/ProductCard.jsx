import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Img from "../common/Img";
import { getCategory } from "../../data/categories";
import { fadeUp, viewOnce } from "../../utils/animations";

export default function ProductCard({ product: p, index = 0 }) {
  return (
    <motion.article variants={fadeUp} initial="hidden" whileInView="show" viewport={viewOnce} transition={{ delay: (index % 4) * 0.06 }} className="group flex h-full flex-col border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-primary">
      <Link to={`/products/${p.slug}`} tabIndex={-1} aria-hidden="true" className="block aspect-square overflow-hidden bg-mist">
        <Img src={p.image} alt="" width={800} height={800} className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">{getCategory(p.category)?.name}</span>
        <h3 className="mt-1 text-lg font-semibold leading-snug">{p.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-charcoal/75">{p.shortDescription}</p>
        <Link to={`/products/${p.slug}`} aria-label={`View ${p.name}`} className="mt-4 inline-flex items-center gap-1.5 pt-1 text-sm font-semibold uppercase tracking-wide text-primary">
          View Product <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
