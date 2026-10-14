import { ImageResponse } from "next/og"

import { profile } from "@/data/profile"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

/** ABB monogram favicon: light initials in a hairline frame on near-black. */
export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 54,
            height: 42,
            border: "3px solid #52525b",
            borderRadius: 9,
            color: "#fafafa",
            fontSize: 21,
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
