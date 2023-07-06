import { env } from "@/env.mjs";
import { getSitemapData } from "@/lib/sanity/site";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const indexes = [
    {
      url: env.NEXT_PUBLIC_URL,
      lastModified: new Date(),
    },
    {
      url: env.NEXT_PUBLIC_URL + "events",
      lastModified: new Date(),
    },
    {
      url: env.NEXT_PUBLIC_URL + "articles",
      lastModified: new Date(),
    },
    {
      url: env.NEXT_PUBLIC_URL + "speakers",
      lastModified: new Date(),
    },
    {
      url: env.NEXT_PUBLIC_URL + "partners",
      lastModified: new Date(),
    },
    {
      url: env.NEXT_PUBLIC_URL + "members",
      lastModified: new Date(),
    },
    {
      url: env.NEXT_PUBLIC_URL + "mentors",
      lastModified: new Date(),
    },
    {
      url: env.NEXT_PUBLIC_URL + "contact-us",
      lastModified: new Date(),
    },
  ];
  const items = await getSitemapData();

  const events = items
    .filter((item) => item._type === "event")
    .map((event) => ({
      url: `${env.NEXT_PUBLIC_URL}events/${event.slug}`,
      lastModified: new Date(event._updatedAt),
    }));
  const members = items
    .filter((item) => item._type === "member")
    .map((member) => ({
      url: `${env.NEXT_PUBLIC_URL}members/${member.slug}`,
      lastModified: new Date(member._updatedAt),
    }));
  const speakers = items
    .filter((item) => item._type === "speaker")
    .map((speaker) => ({
      url: `${env.NEXT_PUBLIC_URL}speakers/${speaker.slug}`,
      lastModified: new Date(speaker._updatedAt),
    }));
  const articles = items
    .filter((item) => item._type === "article")
    .map((article) => ({
      url: `${env.NEXT_PUBLIC_URL}articles/${article.slug}`,
      lastModified: new Date(article._updatedAt),
    }));
  const partners = items
    .filter((item) => item._type === "partner")
    .map((partner) => ({
      url: `${env.NEXT_PUBLIC_URL}partners/${partner.slug}`,
      lastModified: new Date(partner._updatedAt),
    }));

  return [
    ...indexes,
    ...events,
    ...speakers,
    ...partners,
    ...articles,
    ...members,
  ];
}
