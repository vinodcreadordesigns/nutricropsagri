import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { navLinks, companyInfo } from "../../data/company";

export default function MobileMenu({ open, onClose }) {
  // Sirf ek dropdown ek time par khulta hai (label store hota hai)
  const [openSub, setOpenSub] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto overscroll-contain bg-deep sm:top-16 lg:hidden"
        >
          <ul className="container-x py-2">
            {navLinks.map((l) => {
              const isOpen = openSub === l.label;
              return (
                <li key={l.label} className="border-b border-white/10">
                  {l.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenSub(isOpen ? null : l.label)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between py-3.5 text-left text-sm font-semibold uppercase tracking-wider text-white sm:text-base"
                      >
                        {l.label}
                        <ChevronDown
                          size={18}
                          className={`transition ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pb-2 pl-4"
                          >
                            {l.children.map((c) => (
                              <li key={c.to}>
                                <Link
                                  to={c.to}
                                  onClick={onClose}
                                  className="block py-2.5 text-sm text-white/80 hover:text-accent"
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={l.to}
                      onClick={onClose}
                      className="block py-3.5 text-sm font-semibold uppercase tracking-wider text-white sm:text-base"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              );
            })}

            <li className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-6 pt-5 text-sm uppercase text-white/80">
              <Link to="/career" onClick={onClose}>
                Career
              </Link>
              {companyInfo.phone && (
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center gap-1.5"
                >
                  <Phone size={14} aria-hidden="true" />
                  {companyInfo.phone}
                </a>
              )}
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}