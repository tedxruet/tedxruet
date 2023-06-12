import SpeakerCard from "@/components/SpeakerCard";
import { urlFor } from "@/lib/sanity";
import { getEventsList } from "@/lib/sanity/events";
import { getEventSpeakers } from "@/lib/sanity/speakers";
import EventSelect from "./EventSelect";

export const revalidate = 0;

type Props = { searchParams: { [key: string]: string | string[] | undefined } };

const Speakers = async ({ searchParams }: Props) => {
  const eventWithSpeakers = await getEventSpeakers(
    typeof searchParams.event === "string" ? searchParams.event : undefined
  );

  return (
    <div className="flex flex-wrap mx-auto">
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
      {eventWithSpeakers.speakers?.length ? null : (
        <div className="p-4 mt-6 w-full rounded-md bg-muted">
          <p className="text-muted-foreground text-center">No speakers found</p>
        </div>
      )}
    </div>
  );
};

export default Speakers;
