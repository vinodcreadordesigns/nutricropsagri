import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import Button from "../common/Button";
import { companyInfo, footerPolicies } from "../../data/company";
import { categories } from "../../data/categories";

// Footer background image badalna ho to yahan path change karo (public/images/ me rakho)
const FOOTER_BG = "/images/hero-footer-1.WebP";

// Agar Creador Designs ki website ka link lagana ho to yahan daalo (khali chhodo to sirf text dikhega)
const DEVELOPER_URL = "";

const quick = [
  ["Company Profile", "/about"],
  ["Management Team", "/about/management-team"],
  ["Our History", "/about/history"],
  ["Our Products", "/products"],
  ["Gallery", "/gallery"],
  ["Blog", "/blog"],
  ["Career", "/career"],
  ["Contact Us", "/contact"],
];

const H = ({ children }) => (
  <h2 className="mb-5 text-lg font-semibold !text-white after:mt-3 after:block after:h-[2px] after:w-14 after:bg-primary-bright">
    {children}
  </h2>
);

const Row = ({ icon: I, children }) => (
  <li className="flex gap-3 border-b border-dashed border-white/15 py-3 text-sm">
    <I size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
    <span>{children}</span>
  </li>
);

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-deep text-white/80">
      {/* Background image + halka dark overlay (image dikhegi, text bhi clear rahega) */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src={FOOTER_BG}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-deep/75" />
      </div>

      {/* Call to action */}
      <div className="container-x flex flex-col items-start justify-between gap-5 border-b border-white/10 py-10 sm:flex-row sm:items-center">
        <p className="font-heading text-2xl font-medium text-white sm:text-3xl">
          Ready to Boost Your Crop Health and Yield?
        </p>
        <Button to="/contact" variant="primary">
          Enquiry
        </Button>
      </div>

      {/* Main columns */}
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo image white background ke saath */}
        <div>
          <Link
            to="/"
            aria-label="NutriCrops Agri - Home"
            className="inline-block rounded-md bg-white p-3 sm:p-4"
          >
            <img
              src="/images/logo.WebP"
              alt="NutriCrops Agri"
              width={160}
              height={160}
              className="h-24 w-auto object-contain sm:h-28"
            />
          </Link>
        </div>

        <div>
          <H>Quick Links</H>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {quick.map(([l, to]) => (
              <li key={to + l}>
                <Link to={to} className="transition hover:text-accent">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <H>Products</H>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/products?category=${c.slug}`}
                  className="transition hover:text-accent"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <H>Contact</H>
          <ul>
            <Row icon={MapPin}>{companyInfo.address || "Address will be updated."}</Row>
            <Row icon={Phone}>
              {companyInfo.phone ? (
                <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
              ) : (
                "Phone will be updated."
              )}
            </Row>
            <Row icon={Mail}>
              {companyInfo.email ? (
                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              ) : (
                "Email will be updated."
              )}
            </Row>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-primary py-5 pb-24 text-white sm:pb-5">
        <div className="container-x">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wide">
            {footerPolicies.map((p) => (
              <li key={p.to}>
                <Link to={p.to} className="hover:text-accent">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-col gap-2 border-t border-white/20 pt-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 NutriCrops Agriculture. All Rights Reserved.</p>
            <p>
              Design &amp; Developed by{" "}
              {DEVELOPER_URL ? (
                <a
                  href={DEVELOPER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold transition hover:text-accent"
                >
                  Creador Designs
                </a>
              ) : (
                <span className="font-semibold">Creador Designs</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}