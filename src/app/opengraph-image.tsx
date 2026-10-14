import { ImageResponse } from "next/og"

import { profile } from "@/data/profile"

export const alt = `${profile.name}, ${profile.discipline} ${profile.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Satori can't read CSS variables, so the dark tokens are inlined here.
const c = { bg: "#0a0a0a", fg: "#fafafa", muted: "#a1a1aa", border: "#262626", strong: "#3f3f46" }

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: c.bg,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${c.border} 1.2px, transparent 0)`,
          backgroundSize: "28px 28px",
          color: c.fg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              padding: "10px 14px",
              border: `2px solid ${c.strong}`,
              borderRadius: 12,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: c.muted }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: c.fg }} />
            {profile.availability}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 128,
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.055em",
            }}
          >
            {profile.nameLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 40,
              paddingTop: 28,
              borderTop: `2px solid ${c.border}`,
              fontSize: 28,
              color: c.muted,
            }}
          >
            <span>
              {profile.role}, {profile.discipline.toLowerCase()}
            </span>
            <span>{profile.focus.join("  /  ")}</span>
          </div>
        </div>
      </div>
    ),
    size
  )
}
