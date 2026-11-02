import PageHero from "../components/common/PageHero";
import { Seo } from "../utils/seo";

// Generic page for policies / career. Replace the placeholder text with real content.
export default function InfoPage({ title, path, description, children }) {
  return (
    <>
      <Seo title={`${title} | NutriCrops Agriculture`} description={description} path={path} />
      <PageHero title={title} crumbs={[{ name: "Home", to: "/" }, { name: title, to: path }]} />
      <section className="py-14"><div className="container-x max-w-3xl space-y-4 leading-relaxed text-charcoal/85">{children || <p>Content for this page will be updated. Replace this placeholder with your official {title.toLowerCase()} text.</p>}</div></section>
    </>
  );
}
