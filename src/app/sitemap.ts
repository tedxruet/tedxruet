import { env } from "@/env.mjs";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.NEXT_PUBLIC_URL,
      lastModified: new Date(),
    },
    {
      url: "https://acme.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://acme.com/blog",
      lastModified: new Date(),
    },
  ];
}
