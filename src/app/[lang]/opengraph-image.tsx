import { ImageResponse } from "next/og";
import { getDictionary } from "@/content/dictionary";
import { isLocale } from "@/lib/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Katib Kachi — Data Science & AI portfolio";

const SWATCHES = ["#c9b7f0", "#ffd84d", "#bfd8c9", "#f7c9bd", "#d6dbf7", "#e6e0cd"];

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "en");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fdf7e4",
          color: "#1f2ad4",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 900 }}>
            katib<span style={{ color: "#ee5b43" }}>*</span>
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 3 }}>{t.eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 900, lineHeight: 0.95 }}>
          <div style={{ display: "flex" }}>{t.head1}</div>
          <div style={{ display: "flex" }}>
            {t.head2}
            <span style={{ color: "#ee5b43" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {SWATCHES.map((c) => (
            <div key={c} style={{ display: "flex", width: 150, height: 30, borderRadius: 16, background: c }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
