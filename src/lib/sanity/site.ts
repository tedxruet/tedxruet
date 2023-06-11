import { client } from "./index";
import type { SiteData } from "../types";

export const getHomepageData = () => {
  return client.fetch<SiteData>(
    `*[_type=='site']  | order(_createdAt desc) [0] {
        tagline,
        'bannerUrl': @['banner'].asset->url,
        about,
        'event':@['event']->{
          title,
          'slug': @['slug'].current,
          'speakers': speakers[] -> {
              name, 
              designation,
              'slug':slug.current,
              'photoUrl':photo.asset->url
            },
          'members': members[]{
              post, 
              'slug': @.member->slug.current,
              'name': @.member->name, 
              'photoUrl':@.member->photo.asset->url
            },
          'sponsors': sponsors[]{
              type, 
              'slug': @.partner->slug.current, 
              'name': @.partner->name, 
              'logoUrl':@.partner->logo.asset->url 
            },
        }
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
