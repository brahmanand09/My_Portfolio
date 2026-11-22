import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
