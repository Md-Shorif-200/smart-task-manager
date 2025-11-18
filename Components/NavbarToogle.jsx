
"use client"; 
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function NavbarToggle() {
  const pathname = usePathname();

  if (pathname === "/log-in" || pathname === "/sign-up") {
    return null;
  }

  return (
    <div>
      <Navbar />
    </div>
  );
}
