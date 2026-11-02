import { motion } from "framer-motion";
import Img from "../common/Img";
import { fadeUp, viewOnce } from "../../utils/animations";

// ---- Yahan se text / numbers edit karo ----
const TITLE = "About NutriCrops Agri Search India Pvt. Ltd.";
const HEADING =
  "Since 2000, we have grown to become India's leading manufacturer of various types of high quality plant nutrition products.";
const PARAGRAPH =
  "At NutriCrops Agri Search, we lead the way in agricultural innovation, producing top-tier organic fertilizers without compromise. Our name is synonymous with trust and excellence, making us the go-to choice for farmers seeking unparalleled solutions in cultivation. In the realm of organic fertilizers, NutriCrops Agri Search defines excellence.";
const STATS = [
  { value: "100 +", label: "Product Range" },
  { value: "36", label: "Popular Brands" },
  { value: "35+", label: "Awards Achiever" },
];
const START_YEAR = 2000;
const END_YEAR = new Date().getFullYear(); // har saal apne aap update hoga
const ABOUT_IMAGE = "/images/about.svg"; // building ki photo yahan lagao (jaise /images/about.webp)
// -------------------------------------------

export default function AboutPreview() {
  const years = END_YEAR - START_YEAR;

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
      <div className="container-x">
        {/* Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewOnce}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold text-charcoal sm:text-3xl">{TITLE}</h2>
          <span className="mx-auto mt-3 block h-[2px] w-24 bg-primary" aria-hidden="true" />
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-6xl items-start gap-10 lg:mt-12 lg:grid-cols-[1fr_1.9fr] lg:gap-12">
          {/* LEFT: heading + paragraph */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h3 className="text-justify text-xl font-bold leading-snug text-primary sm:text-2xl lg:text-[22px] xl:text-[26px]">
              {HEADING}
            </h3>
            <p className="mt-8 text-justify text-sm leading-7 text-charcoal/80 sm:text-[15px]">
              {PARAGRAPH}
            </p>

            {/* Decorative green bar: left edge tak (sirf laptop/desktop) */}
            <span
              className="absolute -bottom-10 right-0 hidden h-3 w-[100vw] bg-primary lg:block"
              aria-hidden="true"
            />
          </motion.div>

          {/* RIGHT: stats + legacy card + image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewOnce}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Stats */}
            <ul className="grid grid-cols-3 gap-3 sm:gap-6">
              {STATS.map((s) => (
                <li key={s.label}>
                  <p className="text-3xl font-extrabold leading-none text-charcoal sm:text-4xl xl:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-charcoal sm:text-sm lg:text-base">
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>

            {/* Legacy card + image */}
            <div className="mt-8 grid grid-cols-1 min-[480px]:grid-cols-2 lg:mt-12">
              {/* Mint card */}
              <div className="flex flex-col items-center justify-center bg-[#ccfce0] px-4 py-8 text-center">
                <div className="relative leading-[0.85]">
                  <p className="text-5xl font-extrabold text-charcoal sm:text-6xl">{START_YEAR}</p>
                  <span className="absolute left-1/2 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white sm:h-10 sm:w-10 sm:text-base">
                    to
                  </span>
                  <p className="text-5xl font-extrabold text-charcoal sm:text-6xl">{END_YEAR}</p>
                </div>

                <p className="mt-5 flex w-full items-center justify-center gap-2 text-base font-semibold text-charcoal sm:text-lg">
                  <span className="h-px w-6 bg-charcoal sm:w-10" aria-hidden="true" />
                  The Legacy of
                  <span className="h-px w-6 bg-charcoal sm:w-10" aria-hidden="true" />
                </p>

                <p className="mt-2 text-7xl font-extrabold leading-none text-charcoal sm:text-8xl">
                  {years}
                </p>

                <p className="mt-3 flex w-full items-center justify-center gap-2 text-base font-semibold text-charcoal sm:text-lg">
                  <span className="h-px w-8 bg-charcoal sm:w-12" aria-hidden="true" />
                  Years
                  <span className="h-px w-8 bg-charcoal sm:w-12" aria-hidden="true" />
                </p>
              </div>

              {/* Building image */}
              <div className="min-h-[260px] overflow-hidden">
                <Img
                  src={ABOUT_IMAGE}
                  alt="Company manufacturing facility"
                  width={600}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Decorative green bar: right edge tak (sirf laptop/desktop) */}
            <span
              className="absolute left-full top-[72%] ml-10 hidden h-3 w-[100vw] bg-primary xl:block"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}