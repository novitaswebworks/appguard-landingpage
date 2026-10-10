import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AppGuard — Biometric App Lock & Privacy Vault",
    short_name: "AppGuard",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#eeeadf",
    theme_color: "#eeeadf",
    icons: [
      {
        src: "/assets/appguard-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/assets/appguard-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
