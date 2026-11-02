import { useParams } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import BlogGrid from "../../components/blog/BlogGrid";
import Img from "../../components/common/Img";
import { fmtDate } from "../../components/blog/BlogCard";
import NotFound from "../NotFound";
import { Seo, articleLd } from "../../utils/seo";
import { blogs, getBlog } from "../../data/blogs";

export default function BlogDetails() {
  const { slug } = useParams();
  const b = getBlog(slug);
  if (!b) return <NotFound />;
  const more = blogs.filter((x) => x.slug !== slug).slice(0, 3);
  return (
    <>
      <Seo title={`${b.title} | NutriCrops Agriculture`} description={b.excerpt} path={`/blog/${b.slug}`} image={b.image} type="article" jsonLd={articleLd(b)} />
      <PageHero title={b.title} crumbs={[{ name: "Home", to: "/" }, { name: "Blog", to: "/blog" }, { name: b.title, to: `/blog/${b.slug}` }]} />
      <article className="py-14"><div className="container-x max-w-3xl">
        <p className="mb-6 text-sm text-charcoal/70">{b.category} - <time dateTime={b.date}>{fmtDate(b.date)}</time> - {b.readTime}</p>
        <Img src={b.image} alt={b.title} width={1000} height={600} className="mb-8 h-auto w-full" />
        <div className="space-y-5 text-lg leading-relaxed text-charcoal/90">{b.content.map((p, i) => <p key={i}>{p}</p>)}</div>
      </div></article>
      <section className="bg-mist py-14"><div className="container-x"><h2 className="mb-6 text-2xl font-semibold">More Articles</h2><BlogGrid items={more} /></div></section>
    </>
  );
}
