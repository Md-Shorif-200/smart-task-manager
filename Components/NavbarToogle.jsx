"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const noLayoutPaths = ["/log-in", "sign-up"];

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const showLayout = !noLayoutPaths.includes(pathname);

  return (
    <>
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </>
  );
};

export default LayoutWrapper;
