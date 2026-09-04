import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  // The icon-only, dark-background variant — the full lockup crop carries
  // its wordmark baked in as black pixels, illegible against this background.
  const mark = readFileSync(join(process.cwd(), "public/brand/mark-on-dark.png")).toString(
    "base64"
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        <img src={`data:image/png;base64,${mark}`} width={130} height={100} alt="" />
        <div
          style={{
            marginTop: 32,
            fontSize: 56,
            fontWeight: 800,
            color: "#f5f2ed",
            fontFamily: "sans-serif",
            letterSpacing: -1,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            color: "#f5f2edaa",
            fontFamily: "sans-serif",
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    size
  );
}
