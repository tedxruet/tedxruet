import { urlFor } from "@/lib/sanity";
import { getEventSpeakers } from "@/lib/sanity/events";
import { notFound } from "next/navigation";
import { CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import SpeakerCard from "@/components/SpeakerCard";
import AnnouncingSoonCard from "@/components/AnnouncingSoonCard";

type Props = {
  params: { eventSlug: string };
};

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventSpeakers(params.eventSlug);

  return {
    title: "Speakers -" + event.title,
    description: event.preamble,
    openGraph: { images: [event.coverUrl], description: event.preamble },
  };
}

export default async function AboutPage({ params: { eventSlug } }: Props) {
  const event = await getEventSpeakers(eventSlug);
  if (!event) {
    notFound();
  }

  return (
    <div>
      <CardTitle className="text-3xl mb-2 md:text-4xl text-balance">
        Speakers - {event.title}
      </CardTitle>
      <p className="text-muted-foreground mb-6">
        TEDxRUET Speakers for <span className="font-medium">{event.title}</span>{" "}
        event
      </p>
      <div className="flex flex-wrap justify-center lg:max-w-screen-lg mx-auto">
        {event.speakers?.map((speaker) => (
          <div
            key={speaker.slug}
            className="p-1 md:p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs w-full"
          >
            <SpeakerCard
              speaker={{
                slug: speaker.slug,
                designation: speaker.designation,
                name: speaker.name,
                photoUrl: urlFor(speaker.photo).height(450).url(),
              }}
            />
          </div>
        ))}
        {event.speakers?.length ? null : <AnnouncingSoonCard />}
      </div>
    </div>
  );
}
