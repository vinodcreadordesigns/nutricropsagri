import { Link } from "react-router-dom";
import { ChevronDown, Facebook, Instagram, Linkedin, Search, Youtube } from "lucide-react";
import { socialLinks } from "../../data/company";

// Icons ka order yahan se badal sakte ho
const socials = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "youtube", label: "YouTube", Icon: Youtube },
];

export default function TopBar({ onSearch }) {
  return (
    <div className="flex items-center gap-5 text-[17px] font-semibold uppercase text-white">
      {/* Social icons: English ke left me, hamesha dikhte hain */}
      <ul className="flex items-center gap-2" aria-label="Social media">
        {socials.map(({ key, label, Icon }) => {
          const url = socialLinks?.[key];
          const hasUrl = Boolean(url);
          return (
            <li key={key}>
              <a
                href={hasUrl ? url : "#"}
                {...(hasUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={hasUrl ? undefined : (e) => e.preventDefault()}
                aria-label={label}
                title={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/70 transition hover:border-accent hover:text-accent"
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>

      <span className="h-px w-8 bg-white/70" aria-hidden="true" />

      <span className="flex items-center gap-1">
        <label className="sr-only" htmlFor="lang">Language</label>
        <select id="lang" defaultValue="en" className="cursor-pointer appearance-none bg-transparent uppercase outline-none">
          <option className="text-ink" value="en">English</option>
        </select>
        <ChevronDown size={14} aria-hidden="true" />
      </span>

      <Link to="/career" className="border-l border-white/40 pl-5 hover:text-accent">Career</Link>
      <Link to="/contact" className="border-l border-accent pl-5 hover:text-accent">Contact Us</Link>
      <button
        type="button"
        onClick={onSearch}
        className="flex items-center gap-1.5 border-l border-white/40 pl-5 uppercase hover:text-accent"
      >
        <Search size={17} /> Search
      </button>
    </div>
  );
}