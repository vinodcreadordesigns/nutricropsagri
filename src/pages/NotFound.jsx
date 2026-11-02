import { Sprout } from "lucide-react";
import Button from "../components/common/Button";
import { Seo } from "../utils/seo";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-screen items-center bg-deep pt-32 text-center text-white">
      <Seo title="Page Not Found | NutriCrops Agriculture" description="The page you are looking for does not exist." path="/404" noindex />
      <div className="absolute inset-0 -z-10 bg-[url('/images/hero-3.svg')] bg-cover opacity-25" aria-hidden="true" />
      <div className="container-x py-16">
        <Sprout size={56} className="mx-auto text-accent" aria-hidden="true" />
        <p className="mt-4 font-heading text-7xl font-bold text-accent sm:text-8xl">404</p>
        <h1 className="mt-2 text-3xl font-semibold !text-white">Page Not Found</h1>
        <p className="mx-auto mt-3 max-w-md text-white/80">The page you're looking for doesn't exist.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Button to="/" variant="yellow">Back to Home</Button><Button to="/products" variant="outline">Explore Products</Button></div>
      </div>
    </section>
  );
}
