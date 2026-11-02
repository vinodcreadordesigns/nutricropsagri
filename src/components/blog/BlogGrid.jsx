import BlogCard from "./BlogCard";
export default function BlogGrid({ items }) {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((b) => <BlogCard key={b.slug} blog={b} />)}</div>;
}
