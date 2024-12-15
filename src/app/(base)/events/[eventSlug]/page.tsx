import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { PortableText } from "@portabletext/react";
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getEventInfo } from "@/lib/sanity/events";
import type { Metadata } from "next";
import { urlFor } from "@/lib/sanity";

type Props = {
  params: { eventSlug: string };
};

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventInfo(params.eventSlug);

  return {
    title: event.title,
    description: event.preamble,
    openGraph: { images: [event.coverUrl], description: event.preamble },
  };
}

const EventPage = async ({ params: { eventSlug } }: Props) => {
  const event = await getEventInfo(eventSlug);
  if (!event) {
    notFound();
  }

  return (
    <>
      <Image
        src={event.coverUrl}
        alt={event.title}
        height={600}
        width={1200}
        className="h-52 md:h-64 lg:h-72 object-cover rounded-md"
      />
      <div className="py-6">
        <CardTitle className="text-3xl md:text-4xl text-balance">
          {event.title}
        </CardTitle>
        <CardDescription className="flex gap-2 pt-2">
          <CalendarIcon className="size-5" aria-label="Date and Time:" />{" "}
          {dayjs(event.time).format("MMM DD, YYYY hh:mm A (TZ)")}
        </CardDescription>
        <CardDescription className="flex gap-2 pt-2">
          <MapPinIcon className="size-5" aria-label="Event Venue:" />{" "}
          {event.venue}
        </CardDescription>
        <CardDescription className="pt-2 text-balance">
          {event.preamble}
        </CardDescription>
      </div>
      <Button disabled={!event.registrationLink} asChild>
        <Link href={event.registrationLink ?? ""}>
          <LinkIcon size={18} />
          &nbsp;Registration Link
        </Link>
      </Button>

      <article className="prose dark:prose-invert md:prose-lg max-w-screen-lg mt-8">
        <PortableText
          value={event.content}
          components={{
            types: {
              image: ({ value }) => (
                <Image
                  src={urlFor(value).url()}
                  alt={value.alt}
                  className="h-64 w-auto block mx-auto"
                  width={400}
                  height={400}
                />
              ),
            },
          }}
        />
      </article>
    </>
  );
};

export default EventPage;
