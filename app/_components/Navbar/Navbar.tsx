"use client";

import { useState, useEffect } from "react";
import Nav from "./Nav";
import NavMobile from "./NavMobile";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Nav isMobile={isMobile} />
      {isMobile && <NavMobile />}
    </>
  );
}
