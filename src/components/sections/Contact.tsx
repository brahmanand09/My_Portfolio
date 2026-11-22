"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";
import { siteConfig, socialLinks } from "@/data/portfolio";
import { Tilt3D } from "@/components/ui/Tilt3D";

const socialIconMap = {
  facebook: FaFacebook,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
} as const;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Capture the form now — React clears event.currentTarget once the handler yields.
    const form = event.currentTarget;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setStatus("loading");
    setMessage("");

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to send message");
      }

      form.reset();
      setStatus("success");
      setMessage(data.message ?? "Message sent successfully!");

      resetTimer.current = setTimeout(() => {
        setMessage("");
        setStatus("idle");
      }, 5000);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section id="contact" className="section-block-alt scene-3d pt-10 pb-12 md:pt-12 md:pb-16">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-title text-3d mt-3">Let&apos;s Work Together</h2>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8">
          <motion.div
            className="contact-card card-depth flex h-full flex-col"
            initial={{ opacity: 0, x: -52 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-muted">
              Have a project in mind or want to collaborate? Reach out — I&apos;d love to
              hear from you.
            </p>

            <div className="mt-6 space-y-4">
              <p className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-lg text-primary-light">
                  <FaPaperPlane aria-hidden />
                </span>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="text-foreground no-underline transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </Link>
              </p>
              <p className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-lg text-primary-light">
                  <FaPhone aria-hidden />
                </span>
                <Link
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="text-foreground no-underline transition-colors hover:text-accent"
                >
                  {siteConfig.phone}
                </Link>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.icon];
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-xl text-muted no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-accent"
                  >
                    <Icon aria-hidden />
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-6">
              <Link href={siteConfig.cvPath} download className="btn-primary">
                Download CV
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="h-full"
            initial={{ opacity: 0, x: 52 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tilt3D maxTilt={6} className="h-full">
              <div className="contact-card card-depth h-full">
              <form onSubmit={handleSubmit} className="w-full">
                <label htmlFor="contact-name" className="sr-only">
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="Name"
                  placeholder="Your Name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  className="form-input my-2"
                />
                <label htmlFor="contact-email" className="sr-only">
                  Your email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="Email"
                  placeholder="Your Email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  className="form-input my-2"
                />
                <label htmlFor="contact-message" className="sr-only">
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  name="Message"
                  rows={4}
                  placeholder="Your Message"
                  maxLength={5000}
                  required
                  className="form-input my-2 resize-y"
                />
                {/* Honeypot: hidden from people, bots tend to fill it in. */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary mt-3 w-full cursor-pointer justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
              {message && (
                <p
                  className={`mt-4 text-sm ${
                    status === "error" ? "text-error" : "text-success"
                  }`}
                  role={status === "error" ? "alert" : "status"}
                >
                  {message}
                </p>
              )}
              </div>
            </Tilt3D>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
