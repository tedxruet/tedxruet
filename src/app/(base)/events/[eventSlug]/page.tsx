import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { PortableText } from "@portabletext/react";
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getEvent } from "@/lib/sanity/events";
import type { Metadata, ResolvingMetadata } from "next";
import { urlFor } from "@/lib/sanity";

type Props = { params: { eventSlug: string } };

export const revalidate = 300;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent(params.eventSlug);

  return {
    title: event.title,
    description: event.preamble,
    openGraph: { images: [event.coverUrl], description: event.preamble },
  };
}

const EventPage = async ({ params: { eventSlug } }: Props) => {
  const event = await getEvent(eventSlug);
  if (!event) {
    notFound();
  }

  return (
    <main className="container p-2">
      <section aria-label="Event" className="max-w-screen-lg mx-auto">
        <Card className="border-none shadow-none">
          <Image
            src={event.coverUrl}
            alt={event.title}
            height={600}
            width={1200}
            className="h-52 md:h-64 lg:h-72 object-cover rounded-md mb-4"
          />
          <CardHeader className="px-0">
            <CardTitle className="text-3xl md:text-4xl">
              {event.title}
            </CardTitle>
            <CardDescription className="flex gap-2 pt-2">
              <CalendarIcon size={24} aria-label="Date and Time:" />{" "}
              {dayjs(event.time).format("MMM DD, YYYY HH:mm A")}
            </CardDescription>
            <CardDescription className="flex gap-2 pt-2">
              <MapPinIcon size={24} aria-label="Event Venue:" /> {event.venue}
            </CardDescription>
            <CardDescription className="max-w-screen-md">
              {event.preamble}
            </CardDescription>
          </CardHeader>
          <CardFooter className="px-0">
            <Link legacyBehavior href={event.registrationLink ?? ""} passHref>
              <Button disabled={!event.registrationLink}>
                <LinkIcon size={18} />
                &nbsp;Registration Link
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <article className="prose dark:prose-invert md:prose-lg max-w-screen-md">
          <PortableText
            value={event.content}
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
      </section>
    </main>
  );
};

export default EventPage;
