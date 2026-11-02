import { Helmet } from "react-helmet-async";
import { companyInfo, socialLinks } from "../data/company";

const base = companyInfo.siteUrl.replace(/\/$/, "");
export const abs = (p = "/") => (p.startsWith("http") ? p : `${base}${p}`);

export function Seo({ title, description, path = "/", image = "/images/og-image.svg", type = "website", jsonLd, noindex = false }) {
  const list = [].concat(jsonLd || []);
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={abs(path)} />
      {noindex && <meta name="robots" content="noindex,follow" />}
      <meta property="og:site_name" content={companyInfo.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={abs(path)} />
      <meta property="og:image" content={abs(image)} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={abs(image)} />
      {list.map((d, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(d)}</script>
      ))}
    </Helmet>
  );
}

const sameAs = () => Object.values(socialLinks).filter(Boolean);
export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: companyInfo.name,
  url: base,
  logo: abs("/images/logo.svg"),
  ...(sameAs().length && { sameAs: sameAs() }),
  ...(companyInfo.phone && { telephone: companyInfo.phone }),
  ...(companyInfo.email && { email: companyInfo.email }),
});
export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: companyInfo.name,
  url: base,
});
export const localBusinessLd = () =>
  companyInfo.address
    ? { "@context": "https://schema.org", "@type": "LocalBusiness", name: companyInfo.name, url: base, address: companyInfo.address, ...(companyInfo.phone && { telephone: companyInfo.phone }), ...(companyInfo.email && { email: companyInfo.email }) }
    : null;
export const productLd = (p, categoryName) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.shortDescription,
  image: abs(p.image),
  category: categoryName,
  brand: { "@type": "Brand", name: companyInfo.name },
  url: abs(`/products/${p.slug}`),
});
export const articleLd = (b) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: b.title,
  description: b.excerpt,
  image: abs(b.image),
  datePublished: b.date,
  author: { "@type": "Organization", name: companyInfo.name },
  publisher: { "@type": "Organization", name: companyInfo.name, logo: { "@type": "ImageObject", url: abs("/images/logo.svg") } },
  mainEntityOfPage: abs(`/blog/${b.slug}`),
});
export const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.to) })),
});
