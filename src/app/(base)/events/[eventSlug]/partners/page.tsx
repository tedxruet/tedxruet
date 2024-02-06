import { getEventSponsors } from "@/lib/sanity/events";
import { notFound } from "next/navigation";
import { CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import SponsorCard from "@/components/SponsorCard";

type Props = {
  params: { eventSlug: string };
};

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventSponsors(params.eventSlug);

  return {
    title: "Partners -" + event.title,
    description: event.preamble,
    openGraph: { images: [event.coverUrl], description: event.preamble },
  };
}

export default async function AboutPage({ params: { eventSlug } }: Props) {
  const event = await getEventSponsors(eventSlug);
  if (!event) {
    notFound();
  }

  return (
    <div>
      <CardTitle className="text-3xl mb-2 md:text-4xl text-balance">
        Partners - {event.title}
      </CardTitle>
      <p className="text-muted-foreground mb-6">
        Partners who played cruical role to make{" "}
        <span className="font-medium">{event.title}</span> event a success.
      </p>
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
    </div>
  );
}
