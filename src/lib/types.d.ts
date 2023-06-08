export type LatestEventData = {
  slug: string;
  title: string;
  preamble: string;
  coverUrl: string;
};

export type LastEventData = {
  title: string;
  slug: string;
  speakers: {
    designation: string;
    name: string;
    slug: string;
    photoUrl: string;
  }[];
  members: { name: string; slug: string; post: string; photoUrl: string }[];
  sponsors: { name: string; slug: string; type: string; logoUrl: string }[];
};
