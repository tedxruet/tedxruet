import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TimerIcon, UserIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getArticles } from "@/lib/sanity/blog";
import { urlFor } from "@/lib/sanity";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

dayjs.extend(relativeTime);

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Blog",
  description: "TEDx Rajshahi University of Engineering & Technology blog.",
};

const pageSize = 5;

const Blog = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = typeof searchParams.page === "string" ? +searchParams.page : 1;
  const articles = await getArticles((page - 1) * pageSize, page * pageSize);

  return (
    <main className="container p-2 min-h-screen">
      <h1 className="text-4xl mt-4 lg:mt-12 mb-8 text-center">Articles</h1>
      <div className="lg:max-w-screen-lg mx-auto">
        <div className="mx-auto flex flex-wrap gap-5">
          {articles.map((article) => (
            <Link
              href={`/articles/${article.slug}`}
              key={article.slug}
              className="w-full"
            >
              <Card
                key={article.slug}
                className="overflow-hidden hover:bg-secondary transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row items-stretch">
                  <Image
                    src={urlFor(article.cover).url()}
                    alt={article.title}
                    width={600}
                    height={250}
                    className="w-full h-56 md:max-w-sm object-cover"
                  />

                  <div className="flex-1">
                    <CardHeader>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription className="flex gap-2">
                        <TimerIcon size={20} aria-label="Date and Time:" />{" "}
                        Posted {dayjs(article._createdAt).fromNow()}
                      </CardDescription>
                      {article.author ? (
                        <CardDescription className="flex gap-2">
                          <UserIcon size={20} aria-label="Event Venue:" />
                          {article.author.name}
                        </CardDescription>
                      ) : null}
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3">{article.preamble}</p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          {articles.length ? null : (
            <p className="w-full text-center bg-muted text-muted-foreground px-4 py-12 rounded-md">
              {"No articles found in this page"}
            </p>
          )}
          <p className="text-muted-foreground mt-8 text-center w-full">
            {`Showing ${articles.length} article(s) in page ${page}`}
          </p>
          <div className="flex gap-3 sm:gap-6 w-full mb-6 justify-center">
            <Link href={`/articles?page=${page - 1}`} legacyBehavior passHref>
              <Button variant="outline" disabled={page <= 1}>
                Prev. Page
              </Button>
            </Link>
            <Link href={`/articles?page=${page + 1}`} legacyBehavior passHref>
              <Button variant="outline" disabled={articles.length < pageSize}>
                Next Page
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blog;
