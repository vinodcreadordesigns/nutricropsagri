// Replace the placeholder images in /public/images/gallery with real photos (WebP recommended).
export const galleryCategories = ["All", "Products", "Manufacturing", "Agriculture", "Events", "Team"];
const g = (n, title, category) => ({ id: n, title, category, src: `/images/gallery/gallery-${n}.svg` });
export const gallery = [
  g(1, "Product range", "Products"),
  g(2, "Packaging line", "Manufacturing"),
  g(3, "Crop field visit", "Agriculture"),
  g(4, "Farmer meet", "Events"),
  g(5, "Our team", "Team"),
  g(6, "Quality testing", "Manufacturing"),
  g(7, "Product display", "Products"),
  g(8, "Field demonstration", "Agriculture"),
  g(9, "Research work", "Manufacturing"),
  g(10, "Annual event", "Events"),
  g(11, "Packaging", "Products"),
  g(12, "Team meeting", "Team"),
];
