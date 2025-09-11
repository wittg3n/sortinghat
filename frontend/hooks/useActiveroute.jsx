// hooks/useActiveRoute.jsx
"use client";

import { usePathname } from "next/navigation";

export default function useActiveRoute() {
  const pathname = usePathname();

  const isActive = (url) => {
    // Exact match or startsWith depending on needs
    return pathname === url;
  };

  return { isActive };
}
