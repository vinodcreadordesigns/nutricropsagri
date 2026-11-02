import { Link } from "react-router-dom";
import { MessageCircle, Phone } from "lucide-react";
import { companyInfo } from "../../data/company";

function Fab({ href, to, label, className, children, side }) {
  const cls = `group fixed bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg ring-4 ring-accent/60 transition duration-300 hover:scale-110 sm:bottom-6 sm:h-14 sm:w-14 ${side} ${className}`;
  const tip = <span className="pointer-events-none absolute hidden whitespace-nowrap rounded bg-ink px-2 py-1 text-xs opacity-0 transition group-hover:opacity-100 sm:block" style={{ [side.includes("left") ? "left" : "right"]: "110%" }}>{label}</span>;
  return to ? <Link to={to} aria-label={label} className={cls}>{children}{tip}</Link> : <a href={href} aria-label={label} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{children}{tip}</a>;
}

export default function FloatingContact() {
  const wa = companyInfo.whatsapp ? { href: `https://wa.me/${companyInfo.whatsapp.replace(/\D/g, "")}` } : { to: "/contact" };
  const tel = companyInfo.phone ? { href: `tel:${companyInfo.phone.replace(/\s/g, "")}` } : { to: "/contact" };
  return (
    <>
      <Fab {...wa} label="Chat on WhatsApp" side="left-3 sm:left-6" className="bg-[#25D366]"><MessageCircle size={26} /></Fab>
      <Fab {...tel} label="Call us" side="right-3 sm:right-6" className="bg-indigo-700"><Phone size={24} /></Fab>
    </>
  );
}
