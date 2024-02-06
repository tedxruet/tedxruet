import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { PortableText } from "@portabletext/react";
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getEvent } from "@/lib/sanity/events";
import type { Metadata } from "next";
import { urlFor } from "@/lib/sanity";
import SponsorCard from "@/components/SponsorCard";
import MemberCard from "@/components/MemberCard";
import SpeakerCard from "@/components/SpeakerCard";
import AnnouncingSoonCard from "@/components/AnnouncingSoonCard";
import { EventsTabs } from "./events-tabs";

type Props = {
  params: { eventSlug: string };
  searchParams: { tab?: string | string[] };
};

export const revalidate = 86400;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent(params.eventSlug);

  return {
    title: event.title,
    description: event.preamble,
    openGraph: { images: [event.coverUrl], description: event.preamble },
  };
}

const EventPage = async ({
  params: { eventSlug },
  searchParams: { tab },
}: Props) => {
  const event = await getEvent(eventSlug);
  if (!event) {
    notFound();
  }

  return (
    <main className="container p-2">
      <div aria-label="Event" className="lg:max-w-screen-lg mx-auto">
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
              {dayjs(event.time).format("MMM DD, YYYY hh:mm A (TZ)")}
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
        <EventsTabs
          event={event}
          value={typeof tab === "string" ? tab : "description"}
        />
        <section aria-label="Partners" className="mt-12">
          <h3 className="text-center text-lg font-bold mb-2">
            {event.sponsors ? "Event Sponsored by:" : ""}
          </h3>
          <div className="flex flex-wrap justify-center mx-auto bg-muted dark:bg-muted-foreground rounded-md">
            {event.sponsors?.map((sponsor) => (
              <div
                key={sponsor.slug}
                className="p-1 md:p-2 md:w-1/3 min-w-[240px] md:min-w-0"
              >
                <SponsorCard sponsor={sponsor} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default EventPage;
