import AnnouncingSoonCard from "@/components/AnnouncingSoonCard";
import SpeakerCard from "@/components/SpeakerCard";
import { urlFor } from "@/lib/sanity";
import { getEventSpeakers } from "@/lib/sanity/speakers";
import type { Metadata } from "next";

type Props = { searchParams: { [key: string]: string | string[] | undefined } };

export const revalidate = 0;

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const eventWithSpeakers = await getEventSpeakers(
    typeof searchParams.event === "string" ? searchParams.event : undefined
  );

  return {
    title: `Team - ${eventWithSpeakers.title}`,
    description: `Speakers of ${eventWithSpeakers.title} Event.`,
    openGraph: {
      images: [urlFor(eventWithSpeakers.cover).width(600).url()],
      description: `Speakers of ${eventWithSpeakers.title} Event.`,
    },
  };
}

const Speakers = async ({ searchParams }: Props) => {
  const eventWithSpeakers = await getEventSpeakers(
    typeof searchParams.event === "string" ? searchParams.event : undefined
  );

  return (
    <div className="flex flex-wrap mx-auto justify-center sm:justify-start">
      {eventWithSpeakers.speakers?.map((speaker) => (
        <div
          key={speaker.slug}
          className="p-1 md:p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs w-full"
        >
          <SpeakerCard
            speaker={{
              slug: speaker.slug,
              designation: speaker.designation,
              name: speaker.name,
              photoUrl: urlFor(speaker.photo).url(),
            }}
          />
        </div>
      ))}
      {eventWithSpeakers.speakers?.length ? null : <AnnouncingSoonCard />}
    </div>
  );
};

export default Speakers;
