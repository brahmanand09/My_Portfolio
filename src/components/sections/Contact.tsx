"use client";

import { FormEvent, useState } from "react";
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to send message");
      }

      setStatus("success");
      setMessage(data.message ?? "Message sent successfully!");
      event.currentTarget.reset();

      setTimeout(() => {
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
    <section id="contact" className="section-block-alt scene-3d">
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

        <div className="mt-14 flex flex-wrap justify-between gap-10">
          <motion.div
            className="w-full md:w-[38%]"
            initial={{ opacity: 0, x: -52 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-muted">
              Have a project in mind or want to collaborate? Reach out — I&apos;d love to
              hear from you.
            </p>

            <div className="mt-8 space-y-5">
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

            <div className="mt-8 flex flex-wrap gap-3">
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
                    <Icon />
                  </Link>
                );
              })}
            </div>

            <Link href={siteConfig.cvPath} download className="btn-primary mt-10">
              Download CV
            </Link>
          </motion.div>

          <motion.div
            className="w-full md:w-[55%]"
            initial={{ opacity: 0, x: 52 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tilt3D maxTilt={6}>
              <div className="contact-card card-depth">
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  type="text"
                  name="Name"
                  placeholder="Your Name"
                  required
                  className="form-input my-3"
                />
                <input
                  type="email"
                  name="Email"
                  placeholder="Your Email"
                  required
                  className="form-input my-3"
                />
                <textarea
                  name="Message"
                  rows={6}
                  placeholder="Your Message"
                  required
                  className="form-input my-3 resize-y"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary mt-4 w-full cursor-pointer justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
              {message && (
                <p
                  className={`mt-4 text-sm ${
                    status === "error" ? "text-error" : "text-success"
                  }`}
                  role="status"
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
