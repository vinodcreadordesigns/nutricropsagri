import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import FloatingContact from "../common/FloatingContact";
import Loading from "../common/Loading";
import { pageTransition } from "../../utils/animations";

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[70] focus:bg-accent focus:px-4 focus:py-2">Skip to content</a>
      <Header />
      <motion.main id="main" key={pathname} {...pageTransition}>
        <Suspense fallback={<Loading />}><Outlet /></Suspense>
      </motion.main>
      <Footer />
      <FloatingContact />
    </>
  );
}
