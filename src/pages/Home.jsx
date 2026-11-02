import Hero from "../components/home/Hero";
import ProductCategories from "../components/home/ProductCategories";
import AboutPreview from "../components/home/AboutPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import CtaBand from "../components/common/CtaBand";
import { Seo, organizationLd, websiteLd, localBusinessLd } from "../utils/seo";

export default function Home() {
  return (
    <>
      <Seo title="NutriCrops Agriculture | Advanced Crop Nutrition & Fertilizer Solutions" description="NutriCrops Agriculture offers advanced crop nutrition solutions - chelated micronutrients, bio fertilizers, biostimulants and water soluble fertilizers for healthier crops." path="/" jsonLd={[organizationLd(), websiteLd(), localBusinessLd()].filter(Boolean)} />
      <Hero />
      <ProductCategories />
      <AboutPreview />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <CtaBand />
    </>
  );
}
