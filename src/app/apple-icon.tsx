import { ImageResponse } from "next/og"

import { logoDataUri } from "@/components/logo"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/** Home-screen icon: the mark in off-white on the dark background. */
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
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img src={logoDataUri("#fafafa", 5.5)} width={120} height={120} alt="" />
      </div>
    ),
    size
  )
}
