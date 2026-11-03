import { Link } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import { socialLinks } from "../../data/company";

/* ---------- Clean filled brand icons ---------- */
const FacebookIcon = (props) => (
  <svg viewBox="0 0 320 512" fill="currentColor" {...props}>
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 448 512" fill="currentColor" {...props}>
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M5 2h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zM12 8a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM16 4.5h2.5a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-.5.5H16a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5z"
    />
    <circle cx="12" cy="13" r="2.9" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <defs>
      <mask id="yt-tube-mask">
        <rect width="24" height="24" fill="#fff" />
        <text
          x="12"
          y="20.2"
          textAnchor="middle"
          fontFamily="Impact, 'Arial Narrow', sans-serif"
          fontSize="8.5"
          textLength="14"
          lengthAdjust="spacingAndGlyphs"
          fill="#000"
        >
          Tube
        </text>
      </mask>
    </defs>
    <text
      x="12"
      y="10.4"
      textAnchor="middle"
      fontFamily="Impact, 'Arial Narrow', sans-serif"
      fontSize="10.5"
      textLength="14"
      lengthAdjust="spacingAndGlyphs"
    >
      You
    </text>
    <rect x="2.5" y="12.5" width="19" height="9.5" rx="2.5" mask="url(#yt-tube-mask)" />
  </svg>
);

// Order image ke hisab se
const socials = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon, size: "h-[18px] w-[18px]" },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon, size: "h-[20px] w-[20px]" },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon, size: "h-[20px] w-[20px]" },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon, size: "h-[24px] w-[24px]" },
];

export default function TopBar({ onSearch }) {
  return (
    <div className="flex items-center gap-5 text-[17px] font-semibold uppercase text-white">
      {/* Social icons */}
      <ul className="flex items-center gap-3" aria-label="Social media">
        {socials.map(({ key, label, Icon, size }) => {
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
                className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-[#e6e6e6] text-[#e6e6e6] transition hover:border-accent hover:text-accent"
              >
                <Icon className={size} aria-hidden="true" />
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