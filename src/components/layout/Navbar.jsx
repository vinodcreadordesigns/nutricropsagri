import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Home, Menu, Search, X } from "lucide-react";
import Logo from "../common/Logo";
import TopBar from "./TopBar";
import { navLinks } from "../../data/company";

// Ye words label ya path me aaye to menu row se hata do (top bar me already hain)
const hiddenWords = ["career", "contact", "search", "english"];

const menuLinks = navLinks.filter((l) => {
  const label = String(l.label || "").toLowerCase();
  const path = String(l.to || "").toLowerCase();
  return !hiddenWords.some((w) => label.includes(w) || path.includes(w));
});

export default function Navbar({ onSearch, menuOpen, onToggle }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Laptop (lg): compact links | Desktop (xl): medium | Large desktop (2xl): full size
  const linkCls = ({ isActive }) =>
    `relative flex h-full items-center gap-1 whitespace-nowrap px-2.5 text-[13px] font-bold uppercase tracking-wide text-white transition hover:text-accent
     xl:px-3 xl:text-[15px] 2xl:px-4 2xl:text-[17px]
     after:absolute after:inset-x-2.5 after:bottom-3 after:h-[2px] after:origin-left after:bg-accent after:transition-transform
     xl:after:inset-x-3 2xl:after:inset-x-4 2xl:after:bottom-4 ${
       isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
     }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-primary shadow-md" : "bg-primary lg:bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="container-x relative flex items-start justify-between"
      >
        {/* Ek hi logo: laptop aur desktop par same size, left gap ke saath */}
        <Link
          to="/"
          aria-label="Agri Search - Home"
          className="absolute left-4 top-0 z-10 w-[130px] drop-shadow-xl sm:left-6 sm:w-[145px] lg:left-8 lg:w-[170px] xl:left-10"
        >
          <Logo compact={scrolled} />
        </Link>

        {/* Logo ke liye jagah (logo width ke barabar) */}
        <div
          className="h-14 w-[130px] shrink-0 sm:h-16 sm:w-[145px] lg:h-[82px] lg:w-[170px]"
          aria-hidden="true"
        />

        <div className="ml-auto flex min-w-0 flex-col items-end">
          {/* Top bar: sirf desktop/laptop, scroll par collapse */}
          <div
            className={`hidden overflow-hidden transition-all duration-300 lg:block ${
              scrolled ? "max-h-0 opacity-0" : "max-h-24 pb-6 pt-4 opacity-100"
            }`}
          >
            <TopBar onSearch={onSearch} />
          </div>

          {/* Menu row */}
          <div className="flex h-14 items-center sm:h-16 lg:h-[82px]">
            <ul className="hidden h-full items-stretch lg:flex">
              {menuLinks.map((l, i) => {
                const isHome =
                  String(l.label || "").trim().toLowerCase() === "home";
                // Last 2 dropdown left ki taraf khulte hain taaki screen se bahar na jayein
                const alignRight = i >= menuLinks.length - 2;
                return (
                  <li key={l.label} className="group relative h-full">
                    <NavLink
                      to={l.to}
                      end={l.to === "/" || !!l.children}
                      aria-label={isHome ? "Home" : undefined}
                      className={linkCls}
                    >
                      {isHome ? (
                        <Home size={20} aria-hidden="true" />
                      ) : (
                        l.label
                      )}
                      {l.children && (
                        <ChevronDown
                          size={14}
                          aria-hidden="true"
                          className="transition group-hover:rotate-180"
                        />
                      )}
                    </NavLink>

                    {l.children && (
                      <ul
                        className={`invisible absolute top-full min-w-[210px] max-w-[calc(100vw-2rem)] translate-y-2 border-t-2 border-accent bg-white py-2 opacity-0 shadow-xl transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 xl:min-w-[230px] ${
                          alignRight ? "right-0" : "left-0"
                        }`}
                      >
                        <span
                          className={`absolute -top-[7px] h-3 w-3 rotate-45 bg-accent ${
                            alignRight ? "right-6" : "left-6"
                          }`}
                          aria-hidden="true"
                        />
                        {l.children.map((c) => (
                          <li key={c.to}>
                            <Link
                              to={c.to}
                              className="block px-5 py-2.5 text-sm font-semibold normal-case text-charcoal transition hover:bg-primary hover:text-white"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Mobile / tablet buttons */}
            <div className="flex items-center gap-1 lg:hidden">
              <button
                type="button"
                onClick={onSearch}
                aria-label="Open search"
                className="p-2.5 text-white"
              >
                <Search size={20} />
              </button>
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="p-2.5 text-white"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}