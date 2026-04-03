"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const ScrollToTop = () => {
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Prevent browser from restoring scroll position on reload
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
};
