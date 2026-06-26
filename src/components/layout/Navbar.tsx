"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaXmark } from "react-icons/fa6";
import { navLinks, siteConfig } from "@/data/portfolio";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-bg/90 backdrop-blur-xl shadow-[0_4px_30px_rgb(0_0_0/0.25)]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-main">
        <nav className="flex items-center justify-between py-4">
          <Link
            href="#home"
            className="text-2xl font-semibold tracking-tight text-foreground no-underline md:text-3xl"
            onClick={closeMenu}
          >
            <span className="text-gradient">{siteConfig.shortName[0]}</span>
            {siteConfig.shortName.slice(1)}.
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center md:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="mx-5">
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="rounded-lg border border-border bg-surface/50 p-2 text-xl text-foreground backdrop-blur-sm md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </nav>
      </div>

      {/* Mobile menu — only mounted when open to avoid blocking page clicks */}
      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <ul className="fixed top-0 right-0 z-50 flex h-dvh w-[260px] flex-col border-l border-border bg-bg-soft pt-20 md:hidden">
            {navLinks.map((link) => (
              <li key={link.href} className="mx-6 my-3">
                <Link href={link.href} className="nav-link" onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </header>
  );
}
