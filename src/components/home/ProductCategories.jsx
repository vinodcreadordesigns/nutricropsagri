import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";
import Img from "../common/Img";
import { categories } from "../../data/categories";
import { getProductsByCategory } from "../../data/products";

export default function ProductCategories() {
  const [active, setActive] = useState(categories[2].slug);
  const cat = categories.find((c) => c.slug === active);
  // Green section me kitni images dikhani hain (screenshot me 6)
  const items = getProductsByCategory(active).slice(0, 6);

  return (
    <section className="bg-white pt-16 md:pt-20" aria-labelledby="products-title">
      <div className="container-x">
        <SectionTitle
          label="Our Products"
          title="Advanced nutrition solutions for healthier crops and better yields."
          subtitle="Explore our product categories."
        />
        <div
          role="tablist"
          aria-label="Product categories"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((c) => (
            <button
              key={c.slug}
              role="tab"
              id={`tab-${c.slug}`}
              aria-selected={active === c.slug}
              aria-controls="cat-panel"
              type="button"
              onClick={() => setActive(c.slug)}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition sm:text-sm ${
                active === c.slug
                  ? "bg-primary text-white"
                  : "bg-line/70 text-charcoal hover:bg-primary/10"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div id="cat-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Upar: category image + naam + description + button */}
            <div className="container-x grid items-center gap-8 lg:grid-cols-2">
              <Img
                src={`/images/categories/${cat.slug}.WebP`}
                alt={`${cat.name} product range`}
                width={900}
                height={600}
                className="mx-auto h-auto w-full max-w-xl object-contain"
              />
              <div className="pb-6">
                <h3 className="text-3xl font-medium">{cat.name}</h3>
                <p className="mt-4 leading-relaxed text-charcoal/80">{cat.description}</p>
                <Button to={`/products?category=${cat.slug}`} className="mt-6">
                  View All Products
                </Button>
              </div>
            </div>

            {/* Neeche green background: sirf product images */}
            <div className="-mt-6 bg-deep pb-14 pt-24 sm:pt-28 lg:-mt-10 lg:pt-16">
              <div className="container-x">
                {items.length > 0 ? (
                  <ul className="grid grid-cols-2 gap-4 min-[480px]:grid-cols-3 lg:grid-cols-6 lg:gap-5">
                    {items.map((p) => (
                      <li key={p.slug} className="bg-white">
                        <Img
                          src={p.image}
                          alt={p.name}
                          width={400}
                          height={400}
                          className="aspect-square h-full w-full object-contain p-2"
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-white/80">Products coming soon.</p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}