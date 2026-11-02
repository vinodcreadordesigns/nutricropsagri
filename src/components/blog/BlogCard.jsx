import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Img from "../common/Img";
import { fadeUp, viewOnce } from "../../utils/animations";

export const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
export default function BlogCard({ blog: b }) {
  return (
    <motion.article variants={fadeUp} initial="hidden" whileInView="show" viewport={viewOnce} className="group flex h-full flex-col border border-line bg-white transition hover:border-primary">
      <Link to={`/blog/${b.slug}`} tabIndex={-1} aria-hidden="true" className="block aspect-[5/3] overflow-hidden"><Img src={b.image} alt="" width={1000} height={600} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{b.category} <span className="text-charcoal/50">- <time dateTime={b.date}>{fmtDate(b.date)}</time></span></p>
        <h3 className="mt-2 text-lg font-semibold leading-snug"><Link to={`/blog/${b.slug}`}>{b.title}</Link></h3>
        <p className="mt-2 flex-1 text-sm text-charcoal/75">{b.excerpt}</p>
        <Link to={`/blog/${b.slug}`} className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary">Read More &rarr;</Link>
      </div>
    </motion.article>
  );
}
