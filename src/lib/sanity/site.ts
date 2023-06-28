import { client } from "./index";
import type { SiteData } from "../types";

export const getHomepageData = () => {
  return client.fetch<SiteData>(
    `*[_type=='site']  | order(_createdAt desc) [0] {
      title,
      subtitle,
      banners,
      about,
      'event':@['event']->{
        'slug': @['slug'].current,
        'members': members[]{
          post, 
          'slug': @.member->slug.current,
          'name': @.member->name, 
          'photoUrl':@.member->photo.asset->url
        },
      },
      'speakers': speakers[] -> {
        name, 
        designation,
        'slug':slug.current,
        photo
      },
      'partners': partners[] -> {
        name, 
        logo,
        'slug': slug.current
      },
    }`
  );
};

export const getContactData = () => {
  return client.fetch<Pick<SiteData, "contact" | "social">>(
    `*[_type=='site'] | order(_createdAt desc) [0] {
          contact,
          social
        }`
  );
};
