import { getEventMembers } from "@/lib/sanity/events";
import { notFound } from "next/navigation";
import { CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import MemberCard from "@/components/MemberCard";
import AnnouncingSoonCard from "@/components/AnnouncingSoonCard";

type Props = {
  params: { eventSlug: string };
};

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventMembers(params.eventSlug);

  return {
    title: "Organizers -" + event.title,
    description: event.preamble,
    openGraph: { images: [event.coverUrl], description: event.preamble },
  };
}

export default async function AboutPage({ params: { eventSlug } }: Props) {
  const event = await getEventMembers(eventSlug);
  if (!event) {
    notFound();
  }

  return (
    <div>
      <CardTitle className="text-3xl mb-2 md:text-4xl text-balance">
        Organizing Team - {event.title}
      </CardTitle>
      <p className="text-muted-foreground mb-6">
        With their hard work and dedication, they made the event successful.
      </p>
      <div className="flex flex-wrap">
        {event.members?.map((member) => (
          <div
            key={member.slug}
            className="p-1 lg:w-1/5 md:w-3/12 sm:w-4/12 w-6/12"
          >
            <MemberCard member={member} />
          </div>
        ))}
      </div>
      {event.members?.length ? null : <AnnouncingSoonCard />}
    </div>
  );
}
