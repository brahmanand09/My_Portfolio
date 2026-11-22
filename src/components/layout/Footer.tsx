import { FaHeart } from "react-icons/fa6";
import { siteConfig } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft py-8 text-center">
      <p className="text-sm text-muted md:text-base">
        &copy; {new Date().getFullYear()} {siteConfig.name}. Built with Next.js and{" "}
        <FaHeart className="inline text-primary-light" aria-hidden />
      </p>
    </footer>
  );
}
