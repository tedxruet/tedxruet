import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEvents } from "@/lib/sanity/events";
import { urlFor } from "@/lib/sanity";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Events",
  description: "TEDx Rajshahi University of Engineering & Technology events.",
};

const pageSize = 5;

const Events = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = typeof searchParams.page === "string" ? +searchParams.page : 1;
  const events = await getEvents((page - 1) * pageSize, page * pageSize);

  return (
    <main className="container p-2 min-h-screen">
      <h1 className="text-4xl mt-4 lg:mt-12 mb-8 text-center">
        TEDxRUET Events
      </h1>
      <div className="lg:max-w-screen-lg mx-auto">
        <div className="mx-auto flex flex-wrap gap-5">
          {events.map((ev) => (
            <Link href={`/events/${ev.slug}`} key={ev.slug} className="w-full">
              <Card
                key={ev.slug}
                className="overflow-hidden hover:bg-secondary transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row items-stretch">
                  <Image
                    src={urlFor(ev.cover).url()}
                    alt={ev.title}
                    width={600}
                    height={250}
                    className="w-full h-56 md:max-w-sm object-cover"
                  />

                  <div className="flex-1">
                    <CardHeader>
                      <CardTitle className="text-2xl"> {ev.title}</CardTitle>
                      <CardDescription className="flex gap-2">
                        <CalendarIcon size={20} aria-label="Date and Time:" />
                        {dayjs(ev.time).format("MMM DD, YYYY hh:mm A (TZ)")}
                      </CardDescription>
                      <CardDescription className="flex gap-2">
                        <MapPinIcon size={20} aria-label="Event Venue:" />
                        {ev.venue}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3">{ev.preamble}</p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          {events.length ? null : (
            <p className="w-full text-center bg-muted text-muted-foreground px-4 py-12 rounded-md">
              {"No events found in this page"}
            </p>
          )}
          <p className="text-muted-foreground mt-8 text-center w-full">
            {`Showing ${events.length} event(s) in page ${page}`}
          </p>
          <div className="flex gap-3 sm:gap-6 w-full mb-6 justify-center">
            <Link href={`/events?page=${page - 1}`} legacyBehavior passHref>
              <Button variant="outline" disabled={page <= 1}>
                Prev. Page
              </Button>
            </Link>
            <Link href={`/events?page=${page + 1}`} legacyBehavior passHref>
              <Button variant="outline" disabled={events.length < pageSize}>
                Next Page
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Events;
