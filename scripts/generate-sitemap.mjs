// Regenerates public/sitemap.xml and public/robots.txt from your data files.
import fs from "fs";
import { companyInfo } from "../src/data/company.js";
import { products } from "../src/data/products.js";
import { blogs } from "../src/data/blogs.js";

const base = companyInfo.siteUrl.replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);
const paths = ["/", "/about", "/about/management-team", "/about/history", "/products", ...products.map((p) => `/products/${p.slug}`), "/gallery", "/blog", ...blogs.map((b) => `/blog/${b.slug}`), "/contact", "/career"];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`;
fs.mkdirSync("public", { recursive: true });
fs.writeFileSync("public/sitemap.xml", xml);
fs.writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
console.log("Sitemap + robots.txt generated for", base);
