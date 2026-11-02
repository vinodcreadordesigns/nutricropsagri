import { lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";

const lz = (f) => lazy(f);
const CompanyProfile = lz(() => import("../pages/about/CompanyProfile"));
const ManagementTeam = lz(() => import("../pages/about/ManagementTeam"));
const History = lz(() => import("../pages/about/History"));
const Products = lz(() => import("../pages/products/Products"));
const ProductTemplate = lz(() => import("../pages/products/ProductTemplate"));
const ReleaseCalcium = lz(() => import("../pages/products/ReleaseCalcium"));
const ReleaseMagnesium = lz(() => import("../pages/products/ReleaseMagnesium"));
const ReleaseZinc = lz(() => import("../pages/products/ReleaseZinc"));
const Gallery = lz(() => import("../pages/Gallery"));
const Blog = lz(() => import("../pages/blog/Blog"));
const BlogDetails = lz(() => import("../pages/blog/BlogDetails"));
const Contact = lz(() => import("../pages/Contact"));
const InfoPage = lz(() => import("../pages/InfoPage"));
const NotFound = lz(() => import("../pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
const info = (title, path, description) => <Route path={path} element={<InfoPage title={title} path={`/${path}`} description={description} />} />;

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<CompanyProfile />} />
          <Route path="about/management-team" element={<ManagementTeam />} />
          <Route path="about/history" element={<History />} />
          <Route path="products" element={<Products />} />
          {/* Custom product pages (add new ones here - they win over the generic :slug route) */}
          <Route path="products/release-calcium" element={<ReleaseCalcium />} />
          <Route path="products/release-magnesium" element={<ReleaseMagnesium />} />
          <Route path="products/release-zinc" element={<ReleaseZinc />} />
          {/* Every other product renders from src/data/products.js */}
          <Route path="products/:slug" element={<ProductTemplate />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetails />} />
          <Route path="contact" element={<Contact />} />
          {info("Career", "career", "Career opportunities at NutriCrops Agriculture.")}
          {info("Privacy Policy", "privacy-policy", "Privacy policy of NutriCrops Agriculture.")}
          {info("Terms & Conditions", "terms-and-conditions", "Terms and conditions of NutriCrops Agriculture.")}
          {info("Shipping & Delivery Policy", "shipping-delivery-policy", "Shipping and delivery policy of NutriCrops Agriculture.")}
          {info("Refund & Cancellation", "refund-cancellation", "Refund and cancellation policy of NutriCrops Agriculture.")}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
