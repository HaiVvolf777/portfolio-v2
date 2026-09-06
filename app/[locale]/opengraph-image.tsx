import { ImageResponse } from "next/og";
import { isLocale } from "@/lib/i18n";

export const alt = "Haider Ali";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f5f3ed", color: "#202421", position: "relative", fontFamily: "sans-serif", padding: "58px 64px", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 20, letterSpacing: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontWeight: 700, fontSize: 32, letterSpacing: -2 }}>HA</span><span style={{ width: 10, height: 10, borderRadius: 10, background: "#4d63f6" }} /></div>
          <span>{locale.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: 780, marginTop: 44, fontSize: 128, lineHeight: 0.94, letterSpacing: -7, fontWeight: 700 }}><span>Haider</span><span>Ali<span style={{ color: "#4d63f6" }}>.</span></span></div>
        <div style={{ display: "flex", marginTop: "auto", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #b8bdb4", paddingTop: 26, fontSize: 24 }}><span>haivvolf777</span><div style={{ display: "flex", gap: 8 }}><span style={{ width: 12, height: 12, background: "#4d63f6" }} /><span style={{ width: 12, height: 12, border: "1px solid #adb8aa" }} /><span style={{ width: 12, height: 12, border: "1px solid #adb8aa" }} /></div></div>
        <div style={{ position: "absolute", right: 73, top: 184, width: 190, height: 218, border: "1px solid #adb8aa", display: "flex", transform: "skewY(-16deg)" }}>
          <div style={{ display: "flex", position: "absolute", left: 24, top: 26, width: 188, height: 218, border: "1px solid #adb8aa" }} />
          <div style={{ display: "flex", position: "absolute", left: 48, top: 52, width: 188, height: 218, border: "1px solid #adb8aa" }} />
          <div style={{ display: "flex", position: "absolute", left: 87, top: 109, width: 65, height: 65, background: "#4d63f6", borderRadius: 4 }} />
        </div>
      </div>
    ),
    size,
  );
}
