import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(99,102,241,0.35), transparent), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(34,211,238,0.2), transparent), #060a13",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#22d3ee",
          }}
        >
          {siteConfig.role}
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 20 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#94a3b8", marginTop: 24 }}>
          {siteConfig.coreStack} · {siteConfig.experienceYears} years experience
        </div>
      </div>
    ),
    size,
  );
}
