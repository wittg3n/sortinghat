"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return <div>{children}</div>;
}
