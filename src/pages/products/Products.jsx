import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import ProductFilter from "../../components/products/ProductFilter";
import ProductGrid from "../../components/products/ProductGrid";
import { Seo } from "../../utils/seo";
import { products } from "../../data/products";
import { getCategory } from "../../data/categories";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const category = getCategory(params.get("category") || "") ? params.get("category") : "";
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    const s = query.trim().toLowerCase();
    return products.filter((p) => (!category || p.category === category) && (!s || `${p.name} ${p.shortDescription}`.toLowerCase().includes(s)));
  }, [category, query]);
  const setCat = (c) => setParams(c ? { category: c } : {});
  return (
    <>
      <Seo title="Our Products | NutriCrops Agriculture" description="Explore the complete range of NutriCrops agricultural and plant nutrition solutions - chelates, bio fertilizers, biostimulants and more." path="/products" />
      <PageHero title="Our Products" subtitle="Explore our complete range of agricultural and plant nutrition solutions." crumbs={[{ name: "Home", to: "/" }, { name: "Our Products", to: "/products" }]} />
      <section className="py-14 md:py-20"><div className="container-x">
        <ProductFilter category={category} onCategory={setCat} query={query} onQuery={setQuery} />
        <p className="sr-only" aria-live="polite">{items.length} products found</p>
        <ProductGrid items={items} />
      </div></section>
    </>
  );
}
