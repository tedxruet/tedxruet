import type { TypedObject } from "@portabletext/react";

export type LatestEventData = {
  slug: string;
  title: string;
  preamble: string;
  cover: object;
  time: string;
  venue: string;
};

export type LastEventData = {
  title: string;
  slug: string;
  speakers?: {
    designation: string;
    name: string;
    slug: string;
    photoUrl: string;
  }[];
  members?: { name: string; slug: string; post: string; photoUrl: string }[];
  sponsors?: { name: string; slug: string; type: string; logoUrl: string }[];
};

export type FullEventData = {
  title: string;
  slug: string;
  preamble: string;
  coverUrl: string;
  time: string;
  venue: string;
  registrationLink: string | null;
  gallery?: unknown[];
  content: TypedObject[];
  speakers?: {
    designation: string;
    name: string;
    slug: string;
    photo: Image;
  }[];
  members?: { name: string; slug: string; post: string; photoUrl: string }[];
  sponsors?: { name: string; slug: string; type: string; logoUrl: string }[];
};

export type SiteData = {
  tagline: string;
  bannerUrl: string;
  event: LastEventData;
  about: { ted: string; tedx: string; tedxruet: string };
  contact: { phone1: string; phone2?: string; email: string; address: string };
  social: { facebook?: string; linkedin?: string; email: string };
};

export type Speaker = {
  designation: string;
  name: string;
  slug: string;
  photo: Image;
};

export type Member = {
  post: string;
  name: string;
  slug: string;
  photo: Image;
};

export type Partner = {
  link: string;
  type: string;
  name: string;
  slug: string;
  logo: Image;
};
type Image = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};
