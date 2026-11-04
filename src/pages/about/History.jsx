import { motion } from "framer-motion";
import PageHero from "../../components/common/PageHero";
import { Seo } from "../../utils/seo";
import { history } from "../../data/history";
import { viewOnce } from "../../utils/animations";

const lineCls = "border-primary/25";

// S-shaped connector between two badges.
// Badge centres sit at half the badge width, so the connector is inset by the same amount.
function Connector({ toRight }) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-10 h-12 md:mx-16 md:h-16"
    >
      {toRight ? (
        <>
          {/* top-left: down from left badge, curve to the right */}
          <span
            className={`absolute left-0 top-0 h-[calc(50%+1px)] w-1/2 rounded-bl-2xl border-b-2 border-l-2 ${lineCls}`}
          />
          {/* bottom-right: curve down into right badge */}
          <span
            className={`absolute bottom-0 right-0 h-[calc(50%+1px)] w-1/2 rounded-tr-2xl border-r-2 border-t-2 ${lineCls}`}
          />
        </>
      ) : (
        <>
          {/* top-right: down from right badge, curve to the left */}
          <span
            className={`absolute right-0 top-0 h-[calc(50%+1px)] w-1/2 rounded-br-2xl border-b-2 border-r-2 ${lineCls}`}
          />
          {/* bottom-left: curve down into left badge */}
          <span
            className={`absolute bottom-0 left-0 h-[calc(50%+1px)] w-1/2 rounded-tl-2xl border-l-2 border-t-2 ${lineCls}`}
          />
        </>
      )}
    </div>
  );
}

function YearBadge({ year }) {
  return (
    <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-[50%] bg-primary shadow-sm md:h-[88px] md:w-32">
      <span className="font-heading text-xl font-extrabold leading-none text-white md:text-[28px]">
        {year}
      </span>
    </div>
  );
}

export default function History() {
  return (
    <>
      <Seo
        title="Our History | NutriCrops Agriculture"
        description="The journey of NutriCrops Agriculture - milestones in plant nutrition."
        path="/about/history"
      />
      <PageHero
        title="Our History"
        crumbs={[
          { name: "Home", to: "/" },
          { name: "Company Profile", to: "/about" },
          { name: "Our History", to: "/about/history" },
        ]}
      />

      <section className="overflow-hidden py-10 md:py-20">
        <div className="container-x max-w-4xl">
          <ol className="list-none">
            {history.map((h, i) => {
              const isLeft = i % 2 === 0; // even = badge on left, odd = badge on right
              const isLast = i === history.length - 1;

              return (
                <li key={h.year}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewOnce}
                    transition={{ duration: 0.4 }}
                    className={`flex items-center gap-4 md:gap-8 ${
                      isLeft ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isLeft ? (
                      <>
                        <YearBadge year={h.year} />
                        <div className="min-w-0 flex-1 text-left md:max-w-[460px]">
                          <h2 className="text-base font-medium leading-snug text-charcoal md:text-2xl">
                            {h.title}
                          </h2>
                          <p className="mt-0.5 text-sm leading-relaxed text-charcoal/80 md:text-base">
                            {h.text}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="min-w-0 flex-1 text-left md:max-w-[400px] md:flex-none md:basis-[400px]">
                          <h2 className="text-base font-medium leading-snug text-charcoal md:text-2xl">
                            {h.title}
                          </h2>
                          <p className="mt-0.5 text-sm leading-relaxed text-charcoal/80 md:text-base">
                            {h.text}
                          </p>
                        </div>
                        <YearBadge year={h.year} />
                      </>
                    )}
                  </motion.div>

                  {!isLast && <Connector toRight={isLeft} />}
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}