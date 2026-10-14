import { ImageResponse } from "next/og"

import { profile } from "@/data/profile"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 128,
            height: 96,
            border: "5px solid #3f3f46",
            borderRadius: 20,
            color: "#fafafa",
            fontSize: 50,
            fontWeight: 700,
            letterSpacing: "-0.06em",
          }}
        >
          {profile.initials}
        </div>
      </div>
    ),
    size
  )
}
