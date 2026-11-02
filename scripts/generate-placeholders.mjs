// Generates lightweight SVG placeholder images. Replace them with real WebP/AVIF photos.
import fs from "fs";
import path from "path";
import { products } from "../src/data/products.js";
import { categories } from "../src/data/categories.js";
import { blogs } from "../src/data/blogs.js";
import { gallery } from "../src/data/gallery.js";
import { team } from "../src/data/team.js";

const out = (p, s) => { const f = path.join("public", p); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const scene = (w, h, a, b, label, hillA = "#2f8f4e", hillB = "#0e5a30") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#s)"/><circle cx="${w * 0.78}" cy="${h * 0.32}" r="${h * 0.07}" fill="#fff4c2" opacity=".9"/>
<path d="M0 ${h * 0.62} Q ${w * 0.25} ${h * 0.45} ${w * 0.5} ${h * 0.6} T ${w} ${h * 0.55} V${h} H0Z" fill="${hillA}"/>
<path d="M0 ${h * 0.78} Q ${w * 0.3} ${h * 0.64} ${w * 0.6} ${h * 0.76} T ${w} ${h * 0.7} V${h} H0Z" fill="${hillB}"/>
${label ? `<text x="${w / 2}" y="${h * 0.93}" text-anchor="middle" font-family="Arial" font-size="${Math.max(14, h * 0.05)}" fill="#fff" opacity=".8">${esc(label)}</text>` : ""}</svg>`;

out("images/hero-1.svg", scene(1600, 900, "#7fb8e6", "#f5e6b0", "", "#3f9a4f", "#0b5a2c"));
out("images/hero-2.svg", scene(1600, 900, "#f2a65a", "#fde3a7", "", "#4f9a3c", "#0a4d27"));
out("images/hero-3.svg", scene(1600, 900, "#4aa3c7", "#d8f0c8", "", "#2f8f4e", "#08431f"));
out("images/about.svg", scene(900, 700, "#9ccbe8", "#f3ecc0", "Replace with company image"));
out("images/og-image.svg", scene(1200, 630, "#0b5a2c", "#063b23", "NutriCrops Agriculture"));

const bag = (x, y, s, color, name) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-110 -170 L110 -170 L125 190 Q0 215 -125 190Z" fill="#fff" stroke="#d6dbd2" stroke-width="3"/><path d="M-123 90 L123 90 L125 190 Q0 215 -125 190Z" fill="${color}"/><rect x="-110" y="-170" width="220" height="26" fill="${color}" opacity=".35"/><text x="0" y="-60" text-anchor="middle" font-family="Arial" font-weight="700" font-size="30" fill="#063b23">${esc(name.split(" ").slice(0, 2).join(" "))}</text><text x="0" y="-26" text-anchor="middle" font-family="Arial" font-size="18" fill="#555">NutriCrops</text><circle cx="0" cy="38" r="34" fill="${color}"/><path d="M0 58V20M0 34c-10 0-17-6-17-17 11 0 17 6 17 17zm0 8c0-10 6-16 17-16 0 11-7 16-17 16z" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>`;
const color = (slug) => categories.find((c) => c.slug === slug).color;
products.forEach((p) => out(`images/products/${p.slug}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800"><rect width="800" height="800" fill="#f7f9f5"/><ellipse cx="400" cy="660" rx="200" ry="22" fill="#000" opacity=".1"/>${bag(400, 420, 1.45, color(p.category), p.name)}</svg>`));
categories.forEach((c) => out(`images/categories/${c.slug}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600"><rect width="900" height="600" fill="none"/><ellipse cx="450" cy="540" rx="340" ry="22" fill="#000" opacity=".12"/>${bag(250, 340, 1, c.color, c.name)}${bag(650, 340, 1, c.color, c.name)}${bag(450, 320, 1.15, c.color, c.name)}</svg>`));
blogs.forEach((b, i) => out(`images/blog/${b.slug}.svg`, scene(1000, 600, ["#9ccbe8", "#f0b46a", "#8fd0c0", "#b8d98a", "#a9bde8"][i % 5], "#eaf3d0", b.category)));
gallery.forEach((g, i) => out(`images/gallery/gallery-${g.id}.svg`, scene(800, i % 3 === 0 ? 1000 : 600, ["#9ccbe8", "#f0b46a", "#8fd0c0"][i % 3], "#eaf3d0", g.title)));
team.forEach((t, i) => out(`images/team/team-${i + 1}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700"><rect width="600" height="700" fill="#e9efe4"/><circle cx="300" cy="250" r="110" fill="#b7c7ad"/><path d="M80 700 Q300 330 520 700Z" fill="#b7c7ad"/><text x="300" y="665" text-anchor="middle" font-family="Arial" font-size="24" fill="#5b6b52">Photo placeholder</text></svg>`));

const logo = (text, sub) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 64" width="300" height="64"><g fill="none" stroke="#F4C430" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M32 54V26M32 38c-10 0-17-7-17-18 11 0 17 7 17 18zm0 8c0-10 6-17 17-17 0 11-7 17-17 17z" stroke="#009B4D"/></g><text x="64" y="38" font-family="Poppins,Arial,sans-serif" font-weight="700" font-size="28" fill="${text}">Nutri<tspan fill="#009B4D">Crops</tspan></text><text x="65" y="55" font-family="Arial,sans-serif" font-size="11" letter-spacing="3.2" fill="${sub}">AGRICULTURE</text></svg>`;
out("images/logo.svg", logo("#111111", "#555555"));
out("images/logo-light.svg", logo("#ffffff", "#F4C430"));
console.log("Placeholders generated.");
