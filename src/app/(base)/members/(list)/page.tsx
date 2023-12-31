import AnnouncingSoonCard from "@/components/AnnouncingSoonCard";
import MemberCard from "@/components/MemberCard";
import { urlFor } from "@/lib/sanity";
import { getEventTeam } from "@/lib/sanity/members";
import type { Metadata } from "next";

export const revalidate = 0;
type Props = { searchParams: { [key: string]: string | string[] | undefined } };

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const eventWithTeam = await getEventTeam(
    typeof searchParams.event === "string" ? searchParams.event : undefined
  );

  return {
    title: `Team - ${eventWithTeam.title}`,
    description: `Organizing team of ${eventWithTeam.title} Event.`,
    openGraph: {
      images: [urlFor(eventWithTeam.cover).width(600).url()],
      description: `Organizing team of ${eventWithTeam.title} Event.`,
    },
  };
}

const TeamPage = async ({ searchParams }: Props) => {
  const eventWithTeam = await getEventTeam(
    typeof searchParams.event === "string" ? searchParams.event : undefined
  );

  return (
    <div className="flex flex-wrap mx-auto">
      {eventWithTeam.members?.map((member) => (
        <div
          key={member.slug}
          className="p-1 md:p-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 max-w-xs"
        >
          <MemberCard
            member={{
              slug: member.slug,
              post: member.post,
              name: member.name,
              photoUrl: urlFor(member.photo).url(),
            }}
          />
        </div>
      ))}
      {eventWithTeam.members?.length ? null : <AnnouncingSoonCard />}
    </div>
  );
};

export default TeamPage;
