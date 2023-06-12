import { client } from "@/lib/sanity";
import type { Image, Partner } from "../types";

export const getEventPartners = async (event?: string) => {
  const query = event
    ? `
    *[_type=='event' && slug.current=='${event}'][0] {
        title,
        cover,
        'slug': @['slug'].current,
        'partners':sponsors[]{
          type, 
          'slug': @.partner->slug.current,
          'name': @.partner->name, 
          'logo': @.partner->logo
        }
      }  
    `
    : `
    *[_type=='event'] | order(_createdAt desc)[0] {
        title,
        cover,
        'slug': @['slug'].current,
        'partners':sponsors[]{
          type, 
          'slug': @.partner->slug.current,
          'name': @.partner->name, 
          'logo': @.partner->logo
        }
      }
    `;

  return await client.fetch<{
    partners: Partner[];
    title: string;
    slug: string;
    cover: Image;
  }>(query);
};

type PartnerResponse = Omit<Partner, "type"> & {
  description: string;
  events: Array<{ title: string; type: string | null }>;
  website: string;
};

export const getPartner = async (slug: string) => {
  return client.fetch<PartnerResponse>(
    `
    *[_type=='partner' && slug.current==$slug][0] {
        ...,
        'events': *[_type=='event'] | order(_createdAt desc) {
          title,
          'type':sponsors[partner->slug.current==$slug][0].type
        }
     }
  `,
    { slug }
  );
};
