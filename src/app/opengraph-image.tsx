import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          backgroundColor: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 20,
              backgroundColor: "#0d9488",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9Z"
                fill="white"
              />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#0a0a0a" }}>
            Kundeservice <span style={{ color: "#0d9488" }}>Norge</span>
          </div>
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#525252" }}>
          AI-kundeservice som faktisk svarer riktig
        </div>
      </div>
    ),
    { ...size },
  );
}
