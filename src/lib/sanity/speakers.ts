import { client } from "@/lib/sanity";
import { Member, Speaker } from "../types";

export const getEventSpeakers = async (event?: string) => {
  const query = event
    ? `
    *[_type=='event' && slug.current=='${event}'][0] {
        title,
        'slug': @['slug'].current,
        'speakers':speakers[]->{name, photo, designation, 'slug': slug.current}
    }   
    `
    : `
    *[_type=='event'] | order(_createdAt desc)[0] {
        title,
        'slug': @['slug'].current,
        'speakers':speakers[]->{name, photo, designation, 'slug': slug.current}
    }
    `;

  return await client.fetch<{
    speakers: Speaker[];
    title: string;
    slug: string;
  }>(query);
};

export const getSpeaker = (slug: string) => {
  return client.fetch<Speaker & { bio: string }>(
    `
  *[_type=='speaker' && slug.current==$slug][0]
  `,
    { slug }
  );
};
