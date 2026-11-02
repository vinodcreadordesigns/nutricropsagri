import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { navLinks, companyInfo } from "../../data/company";

export default function MobileMenu({ open, onClose }) {
  const [sub, setSub] = useState(false);
  return (
    <AnimatePresence>
      {open && (
        <motion.div id="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-deep lg:hidden">
          <ul className="container-x py-4">
            {navLinks.map((l) => (
              <li key={l.label} className="border-b border-white/10">
                {l.children ? (
                  <>
                    <button type="button" onClick={() => setSub((s) => !s)} aria-expanded={sub} className="flex w-full items-center justify-between py-4 text-left text-base font-semibold uppercase tracking-wider text-white">
                      {l.label}<ChevronDown size={18} className={`transition ${sub ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {sub && (
                        <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-2 pl-4">
                          {l.children.map((c) => <li key={c.to}><Link to={c.to} onClick={onClose} className="block py-2.5 text-sm text-white/80 hover:text-accent">{c.label}</Link></li>)}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link to={l.to} onClick={onClose} className="block py-4 text-base font-semibold uppercase tracking-wider text-white">{l.label}</Link>
                )}
              </li>
            ))}
            <li className="flex gap-6 pt-5 text-sm uppercase text-white/80">
              <Link to="/career" onClick={onClose}>Career</Link>
              {companyInfo.phone && <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>}
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
