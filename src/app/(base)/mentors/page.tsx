import AnnouncingSoonCard from "@/components/AnnouncingSoonCard";
import MemberCard from "@/components/MemberCard";
import { urlFor } from "@/lib/sanity";
import { getEventMentors } from "@/lib/sanity/members";
import type { Metadata } from "next";

export const revalidate = 0;
type Props = { searchParams: { [key: string]: string | string[] | undefined } };

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const eventWithTeam = await getEventMentors(
    typeof searchParams.event === "string" ? searchParams.event : undefined
  );

  return {
    title: `Mentors - ${eventWithTeam.title}`,
    description: `Mentors of ${eventWithTeam.title} Event.`,
    openGraph: {
      images: [urlFor(eventWithTeam.cover).width(600).url()],
      description: `Mentors of ${eventWithTeam.title} Event.`,
    },
  };
}

const MentorsPage = async ({ searchParams }: Props) => {
  const eventWithTeam = await getEventMentors(
    typeof searchParams.event === "string" ? searchParams.event : undefined
  );

  return (
    <div className="flex flex-wrap mx-auto">
      {eventWithTeam.mentors?.map((member) => (
        <div
          key={member.slug}
          className="p-1 md:p-2 w-full sm:w-1/2 md:w-1/4 max-w-xs"
        >
          <MemberCard
            member={{
              slug: member.slug,
              post: "Mentor",
              name: member.name,
              photoUrl: urlFor(member.photo).url(),
            }}
          />
        </div>
      ))}
      {eventWithTeam.mentors?.length ? null : <AnnouncingSoonCard />}
    </div>
  );
};

export default MentorsPage;
