import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Brahmanand Mourya | Full Stack Developer",
    template: "%s | Brahmanand Mourya",
  },
  description:
    "Full Stack Developer with 2+ years of experience in React.js, Next.js, Node.js, MongoDB, and Supabase — building scalable web applications and REST APIs.",
  keywords: [
    "Brahmanand Mourya",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Portfolio",
    "Web Developer India",
  ],
  authors: [{ name: "Brahmanand Mourya" }],
  creator: "Brahmanand Mourya",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Brahmanand Mourya | Full Stack Developer",
    description:
      "Full Stack Developer with 2+ years of experience in React.js, Next.js, Node.js, MongoDB, and Supabase.",
    siteName: "Brahmanand Mourya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brahmanand Mourya | Full Stack Developer",
    description:
      "Full Stack Developer with 2+ years of experience in React.js, Next.js, Node.js, MongoDB, and Supabase.",
    creator: "@Brahmanand_9616",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/educ.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
