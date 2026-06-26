import { FaHeart } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft py-8 text-center">
      <p className="text-sm text-muted md:text-base">
        Copyright &copy; {new Date().getFullYear()} Brahma — made with{" "}
        <FaHeart className="inline text-primary-light" aria-hidden /> by mouryab30
      </p>
    </footer>
  );
}
