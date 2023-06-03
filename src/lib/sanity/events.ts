import { client } from "./index";

export const getLastEvent = () => {
  return client.fetch<{
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
  }>(
    `*[_type=='event'] | order(_createdAt desc)[0] {
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
      }`
  );
};
