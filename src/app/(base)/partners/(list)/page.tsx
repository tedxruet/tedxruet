import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import { getEventPartners } from "@/lib/sanity/partners";
import type { Metadata } from "next";
import AnnouncingSoonCard from "@/components/AnnouncingSoonCard";

export const revalidate = 0;
type Props = { searchParams: { [key: string]: string | string[] | undefined } };

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const eventWithPartners = await getEventPartners(
    typeof searchParams.event === "string" ? searchParams.event : undefined
  );

  return {
    title: `Partners - ${eventWithPartners.title}`,
    description: `Event partners of ${eventWithPartners.title} Event.`,
    openGraph: {
      images: [urlFor(eventWithPartners.cover).width(600).url()],
      description: `Event partners of ${eventWithPartners.title} Event.`,
    },
  };
}

const PartnersPage = async ({ searchParams }: Props) => {
  const eventWithPartners = await getEventPartners(
    typeof searchParams.event === "string" ? searchParams.event : undefined
  );

  return (
    <div className="flex flex-wrap mx-auto">
      {eventWithPartners.partners?.map((partner) => (
        <div
          key={partner.slug}
          className="p-1 md:p-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 max-w-xs"
        >
          <SponsorCard
            sponsor={{
              slug: partner.slug,
              name: partner.name,
              type: partner.type,
              logoUrl: urlFor(partner.logo).url(),
            }}
          />
        </div>
      ))}
      {eventWithPartners.partners?.length ? null : <AnnouncingSoonCard />}
    </div>
  );
};

export default PartnersPage;

const SponsorCard = ({
  sponsor,
}: {
  sponsor: {
    slug: string;
    name: string;
    type: string;
    logoUrl: string;
  };
}) => {
  return (
    <Link href={`/partners/${sponsor.slug}`} aria-label={sponsor.name}>
      <Card className="h-full overflow-hidden bg-transparent border-none">
        <Image
          src={sponsor.logoUrl}
          width={350}
          height={350}
          alt={sponsor.name}
          className="aspect-square w-full object-contain bg-muted dark:bg-muted-foreground"
          loading="lazy"
        />
      </Card>
    </Link>
  );
};
