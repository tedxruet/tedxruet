import { client } from "@/lib/sanity";
import type { Image, Member } from "../types";

export const getEventTeam = async (event?: string) => {
  const query = event
    ? `
    *[_type=='event' && slug.current=='${event}'][0] {
        title,
        cover,
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
        cover,
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
    cover: Image;
  }>(query);
};

type MemberResponse = Omit<Member, "post"> & {
  bio?: string;
  events: Array<{ title: string; post: string | null }>;
  social: {
    facebook?: string;
    linkedin?: string;
  };
};

export const getMember = async (slug: string) => {
  return client.fetch<MemberResponse>(
    `
    *[_type=='member' && slug.current==$slug][0] {
      ...,
      'events': *[_type=='event'] | order(_createdAt desc) {
        title,
        'post':members[member->slug.current==$slug][0].post
      }
    }
  `,
    { slug }
  );
};
