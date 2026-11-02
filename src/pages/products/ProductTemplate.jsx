import { useParams, Link } from "react-router-dom";
import { Check, Wheat, Carrot, Apple, Bean, Sprout, Flower2 } from "lucide-react";
import PageHero from "../../components/common/PageHero";
import Img from "../../components/common/Img";
import Button from "../../components/common/Button";
import SectionTitle from "../../components/common/SectionTitle";
import ProductCard from "../../components/products/ProductCard";
import ProductEnquiryForm from "../../components/products/ProductEnquiryForm";
import NotFound from "../NotFound";
import { Seo, productLd } from "../../utils/seo";
import { getProduct, getRelated } from "../../data/products";
import { getCategory } from "../../data/categories";

const cropIcons = [Wheat, Carrot, Apple, Bean, Sprout, Flower2];
const Block = ({ title, children, bg = "" }) => <section className={`py-12 md:py-16 ${bg}`}><div className="container-x"><h2 className="mb-6 text-2xl font-semibold after:mt-3 after:block after:h-[3px] after:w-14 after:bg-accent">{title}</h2>{children}</div></section>;

// Reusable product page. Pass `slug` (custom page files) or use the /products/:slug route.
export default function ProductTemplate({ slug: propSlug }) {
  const params = useParams();
  const product = getProduct(propSlug || params.slug);
  if (!product) return <NotFound />;
  const cat = getCategory(product.category);
  const related = getRelated(product, 4);
  const crumbs = [{ name: "Home", to: "/" }, { name: "Our Products", to: "/products" }, { name: cat.name, to: `/products?category=${cat.slug}` }, { name: product.name, to: `/products/${product.slug}` }];
  return (
    <>
      <Seo title={`${product.name} | NutriCrops Agriculture`} description={product.shortDescription} path={`/products/${product.slug}`} image={product.image} type="website" jsonLd={productLd(product, cat.name)} />
      <PageHero title={product.name} crumbs={crumbs} />

      <section className="py-12 md:py-16"><div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div className="bg-mist p-6"><Img src={product.image} alt={`${product.name} pack`} width={800} height={800} priority className="mx-auto aspect-square w-full max-w-md object-contain" /></div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{cat.name}</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{product.name}</h2>
          <p className="mt-4 text-lg text-charcoal/80">{product.shortDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3"><Button href="#enquiry">Send Enquiry</Button><Button to="/products" variant="outlineDark">All Products</Button></div>
        </div>
      </div></section>

      <Block title="About Product" bg="bg-mist"><p className="max-w-3xl leading-relaxed text-charcoal/85">{product.description}</p></Block>

      <Block title="Key Benefits"><ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{product.benefits.map((b) => <li key={b} className="flex gap-3 border border-line p-4"><Check className="shrink-0 text-primary" size={20} aria-hidden="true" />{b}</li>)}</ul></Block>

      <Block title="Uses" bg="bg-mist"><ul className="max-w-3xl list-disc space-y-2 pl-5">{product.uses.map((u) => <li key={u}>{u}</li>)}</ul></Block>

      <Block title="Dosage">
        <div className="overflow-x-auto"><table className="w-full min-w-[480px] border border-line text-left text-sm">
          <caption className="sr-only">Dosage table for {product.name}</caption>
          <thead className="bg-primary text-white"><tr><th scope="col" className="p-3">Application</th><th scope="col" className="p-3">Dosage</th><th scope="col" className="p-3">Method</th></tr></thead>
          <tbody>{product.dosage.map((d) => <tr key={d.application} className="border-t border-line even:bg-mist"><th scope="row" className="p-3 font-semibold">{d.application}</th><td className="p-3">{d.dosage}</td><td className="p-3">{d.method}</td></tr>)}</tbody>
        </table></div>
        <p className="mt-3 text-sm text-charcoal/70">{product.dosageNote}</p>
      </Block>

      <Block title="Suitable Crops" bg="bg-mist"><ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">{product.crops.map((c, i) => { const I = cropIcons[i % cropIcons.length]; return <li key={c} className="flex flex-col items-center gap-2 border border-line bg-white p-5 text-center text-sm font-semibold"><I className="text-primary" size={30} aria-hidden="true" />{c}</li>; })}</ul></Block>

      <Block title="Technical Information"><dl className="grid max-w-3xl gap-px bg-line sm:grid-cols-2">{product.technical.map((t) => <div key={t.label} className="bg-white p-4"><dt className="text-xs font-semibold uppercase tracking-wide text-primary">{t.label}</dt><dd className="mt-1">{t.value}</dd></div>)}</dl></Block>

      <section id="enquiry" className="scroll-mt-24 bg-deep py-14 text-white md:py-20"><div className="container-x grid gap-10 lg:grid-cols-2">
        <div><h2 className="text-3xl font-semibold !text-white">Interested in this product?</h2><span className="mt-4 block h-[3px] w-16 bg-accent" /><p className="mt-4 text-white/80">Get in touch with our team.</p></div>
        <div className="bg-white p-6 text-charcoal sm:p-8"><ProductEnquiryForm productName={product.name} /></div>
      </div></section>

      <section className="py-14 md:py-20"><div className="container-x"><SectionTitle label="Explore More" title="Related Products" />
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">{related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}</div></div></section>
    </>
  );
}
