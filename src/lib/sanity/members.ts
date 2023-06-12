import { client } from "@/lib/sanity";
import type { Member } from "../types";

export const getEventTeam = async (event?: string) => {
  const query = event
    ? `
    *[_type=='event' && slug.current=='${event}'][0] {
        title,
        'slug': @['slug'].current,
        'members':members[]{
            post, 
            'slug': @.member->slug.current,
            'name': @.member->name, 
            'photo': @.member->photo
          }
    }   
    `
    : `
    *[_type=='event'] | order(_createdAt desc)[0] {
        title,
        'slug': @['slug'].current,
        'members':members[]{
            post, 
            'slug': @.member->slug.current,
            'name': @.member->name, 
            'photo': @.member->photo
          }
    }
    `;

  return await client.fetch<{
    members: Member[];
    title: string;
    slug: string;
  }>(query);
};
