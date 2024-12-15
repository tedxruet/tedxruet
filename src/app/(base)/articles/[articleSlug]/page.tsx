import Image from "next/image";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { PortableText } from "@portabletext/react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getArticle } from "@/lib/sanity/blog";
import type { Metadata } from "next";
import { urlFor } from "@/lib/sanity";

type Props = { params: { articleSlug: string } };

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.articleSlug);

  return {
    title: article.title,
    description: article.preamble,
    openGraph: {
      images: [urlFor(article.cover).width(600).url()],
      description: article.preamble,
    },
  };
}

const Article = async ({ params: { articleSlug } }: Props) => {
  const article = await getArticle(articleSlug);
  if (!article) {
    notFound();
  }

  return (
    <main className="container p-2">
      <div aria-label="Event" className="lg:max-w-screen-lg mx-auto">
        <Card className="border-none shadow-none">
          <Image
            src={urlFor(article.cover).url()}
            alt={article.title}
            height={600}
            width={1200}
            className="h-52 md:h-64 lg:h-72 object-cover rounded-md mb-4"
          />
          <CardHeader className="px-0">
            <CardTitle className="text-3xl md:text-4xl">
              {article.title}
            </CardTitle>
            <CardDescription>
              Posted on: &nbsp;
              {dayjs(article._createdAt).format("MMM DD, YYYY hh:mm A (TZ)")}
            </CardDescription>
            {article.author ? (
              <CardDescription>
                Posted by: &nbsp;
                {article.author.name}
              </CardDescription>
            ) : null}

            <CardDescription className="max-w-screen-md">
              {article.preamble}
            </CardDescription>
          </CardHeader>
        </Card>
        <article className="prose dark:prose-invert md:prose-lg max-w-screen-md mt-8">
          <PortableText
            value={article.content}
            components={{
              types: {
                image: ({ value }) => (
                  <Image
                    src={urlFor(value).url()}
                    alt={value.alt}
                    className="w-full h-auto"
                    width={0}
                    height={0}
                    unoptimized
                  />
                ),
              },
            }}
          />
        </article>
      </div>
    </main>
  );
};

export default Article;
