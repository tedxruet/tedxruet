import { getEventMentors } from "@/lib/sanity/events";
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
  const event = await getEventMentors(params.eventSlug);

  return {
    title: "Mentors -" + event.title,
    description: event.preamble,
    openGraph: { images: [event.coverUrl], description: event.preamble },
  };
}

export default async function AboutPage({ params: { eventSlug } }: Props) {
  const event = await getEventMentors(eventSlug);
  if (!event) {
    notFound();
  }

  return (
    <div>
      <CardTitle className="text-3xl mb-2 md:text-4xl text-balance">
        Mentors - {event.title}
      </CardTitle>
      <p className="text-muted-foreground mb-6">
        TEDxRUET Mentors for <span className="font-medium">{event.title}</span>{" "}
        event
      </p>
      <div className="flex flex-wrap">
        {event.mentors?.map((member) => (
          <div key={member.slug} className="p-1 md:w-3/12 sm:w-6/12 w-full">
            <MemberCard member={{ ...member, post: "Mentor" }} />
          </div>
        ))}
      </div>
      {event.mentors?.length ? null : <AnnouncingSoonCard />}
    </div>
  );
}
