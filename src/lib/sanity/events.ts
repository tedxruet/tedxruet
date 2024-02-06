import { client } from "./index";
import type { LastEventData, LatestEventData, FullEventData } from "../types";

export const getLastEvent = () => {
  return client.fetch<LastEventData>(
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

export const getEvents = async (from = 0, to = 2) => {
  return client.fetch<Array<LatestEventData>>(
    `
  *[_type=='event'] | order(_createdAt desc)[$from...$to] {
    title,
    preamble,
    venue,
    time,
    'slug': @['slug'].current,
    cover
  }
  `,
    { from, to }
  );
};

export const getEventsList = async () => {
  return client.fetch<Array<Pick<LatestEventData, "title" | "slug">>>(
    `
      *[_type=='event'] | order(_createdAt desc) {
        title,
        'slug': @['slug'].current
      }
    `
  );
};

export const getEventInfo = (slug = "") => {
  return client.fetch<
    Pick<
      FullEventData,
      | "title"
      | "slug"
      | "preamble"
      | "registrationLink"
      | "coverUrl"
      | "venue"
      | "time"
      | "content"
    >
  >(
    `
    *[_type=='event' && slug.current==$slug][0] {
      title,
      preamble,
      venue,
      time,
      registrationLink,
      'slug': @['slug'].current,
      'coverUrl': @['cover'].asset->url,
      content
    }
  `,
    { slug }
  );
};

export const getEventSpeakers = (slug = "") => {
  return client.fetch<
    Pick<FullEventData, "title" | "slug" | "preamble" | "coverUrl" | "speakers">
  >(
    `
    *[_type=='event' && slug.current==$slug][0] {
      title,
      preamble, 
      'slug': @['slug'].current,
      'coverUrl': @['cover'].asset->url,
      'speakers': speakers[] -> {
        name, 
        designation,
        photo,
        'slug':slug.current
      },
    }
  `,
    { slug }
  );
};

export const getEventSponsors = (slug = "") => {
  return client.fetch<
    Pick<FullEventData, "title" | "slug" | "preamble" | "coverUrl" | "sponsors">
  >(
    `
    *[_type=='event' && slug.current==$slug][0] {
      title,
      preamble, 
      'slug': @['slug'].current,
      'coverUrl': @['cover'].asset->url,
      'sponsors': sponsors[]{
        type, 
        'slug': @.partner->slug.current, 
        'name': @.partner->name, 
        'logoUrl':@.partner->logo.asset->url 
      },
    }
  `,
    { slug }
  );
};

export const getEventMembers = (slug = "") => {
  return client.fetch<
    Pick<FullEventData, "title" | "slug" | "preamble" | "coverUrl" | "members">
  >(
    `
    *[_type=='event' && slug.current==$slug][0] {
      title,
      preamble, 
      'slug': @['slug'].current,
      'coverUrl': @['cover'].asset->url,
      'members': members[]{
        post, 
        'slug': @.member->slug.current,
        'name': @.member->name, 
        'photoUrl':@.member->photo.asset->url
      },
    }
  `,
    { slug }
  );
};

export const getEventGallery = (slug = "") => {
  return client.fetch<
    Pick<FullEventData, "title" | "slug" | "preamble" | "coverUrl" | "gallery">
  >(
    `
    *[_type=='event' && slug.current==$slug][0] {
      title,
      preamble,
      gallery,
    }
  `,
    { slug }
  );
};

export const getEventMentors = (slug = "") => {
  return client.fetch<
    Pick<FullEventData, "title" | "slug" | "preamble" | "coverUrl" | "mentors">
  >(
    `
    *[_type=='event' && slug.current==$slug][0] {
      title,
      preamble,
      'mentors':mentors[]->{
        'slug': slug.current,
        name, 
        'photoUrl': photo.asset->url
      },
    }
  `,
    { slug }
  );
};

export const getEvent = (slug = "") => {
  return client.fetch<FullEventData>(
    `
    *[_type=='event' && slug.current==$slug][0] {
      title,
      preamble,
      content,
      venue,
      time,
      registrationLink,
      gallery,
      'slug': @['slug'].current,
      'coverUrl': @['cover'].asset->url,
      'speakers': speakers[] -> {
          name, 
          designation,
          photo,
          'slug':slug.current
        },
      'members': members[]{
        post, 
        'slug': @.member->slug.current,
        'name': @.member->name, 
        'photoUrl':@.member->photo.asset->url
      },
        'mentors':mentors[]->{
          'slug': slug.current,
          name, 
          'photoUrl': photo.asset->url
        },
      'sponsors': sponsors[]{
          type, 
          'slug': @.partner->slug.current, 
          'name': @.partner->name, 
          'logoUrl':@.partner->logo.asset->url 
        },
    }
  `,
    { slug }
  );
};
