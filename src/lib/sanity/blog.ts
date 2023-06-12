import { client } from "@/lib/sanity";
import type { Article } from "../types";

type BlogResponse = Array<
  Pick<
    Article,
    "title" | "slug" | "preamble" | "cover" | "author" | "_createdAt"
  >
>;

export const getArticles = (from = 0, to = 2) => {
  return client.fetch<BlogResponse>(
    `
    *[_type=='article'] | order(_createdAt desc)[$from...$to] {
        title,
        preamble,
        _createdAt,
        'author':@['author']->{name},
        'slug': @['slug'].current,
        cover
    }
    `,
    { from, to }
  );
};

export const getArticle = (slug = "") => {
  return client.fetch<Article>(
    `
      *[_type=='article' && slug.current==$slug][0] {
        title,
        preamble,
        _createdAt,
        'author':@['author']->{name, 'slug':slug.current, photo},
        'slug': @['slug'].current,
        cover,
        content,
        _createdAt,
        _updatedAt,
      }
    `,
    { slug }
  );
};
