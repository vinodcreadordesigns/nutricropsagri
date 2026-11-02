import { Link } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import BlogGrid from "../../components/blog/BlogGrid";
import Img from "../../components/common/Img";
import { fmtDate } from "../../components/blog/BlogCard";
import { Seo } from "../../utils/seo";
import { blogs } from "../../data/blogs";

export default function Blog() {
  const [feat, ...rest] = blogs;
  return (
    <>
      <Seo title="Blog | NutriCrops Agriculture" description="Articles on plant nutrition, micronutrients, bio fertilizers and modern agricultural practices." path="/blog" />
      <PageHero title="Blog" subtitle="Insights on crop nutrition and better farming." crumbs={[{ name: "Home", to: "/" }, { name: "Blog", to: "/blog" }]} />
      <section className="py-14 md:py-20"><div className="container-x">
        <article className="mb-12 grid overflow-hidden border border-line lg:grid-cols-2">
          <Img src={feat.image} alt={feat.title} width={1000} height={600} className="h-full w-full object-cover" />
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Featured - {feat.category} - <time dateTime={feat.date}>{fmtDate(feat.date)}</time></p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl"><Link to={`/blog/${feat.slug}`}>{feat.title}</Link></h2>
            <p className="mt-3 text-charcoal/80">{feat.excerpt}</p>
            <Link to={`/blog/${feat.slug}`} className="mt-5 text-sm font-semibold uppercase tracking-wide text-primary">Read More &rarr;</Link>
          </div>
        </article>
        <BlogGrid items={rest} />
      </div></section>
    </>
  );
}
