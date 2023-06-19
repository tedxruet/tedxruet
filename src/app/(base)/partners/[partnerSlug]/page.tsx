import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FacebookIcon, LinkIcon, LinkedinIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import { getPartner } from "@/lib/sanity/partners";
import type { Metadata } from "next";

type Props = { params: { partnerSlug: string } };


export async function generateMetadata({
  params: { partnerSlug },
}: Props): Promise<Metadata> {
  const partner = await getPartner(partnerSlug);

  return {
    title: `${partner.name}`,
    description: partner.description,
    openGraph: {
      images: [urlFor(partner.logo).width(600).url()],
      description: partner.description,
    },
  };
}

const Member = async ({ params: { partnerSlug } }: Props) => {
  const partner = await getPartner(partnerSlug);
  if (!partner) {
    notFound();
  }

  return (
    <main className="container xl:max-w-screen-xl p-2 min-h-screen">
      <h1 className="text-4xl mt-4 lg:mt-12 mb-8">{}</h1>
      <Card className="border-none shadow-none">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-64 md:w-80 lg:w-96 max-w-sm mx-auto sm:max-w-none sm:mx-0">
            <div className="aspect-square w-full relative">
              <Image
                src={urlFor(partner.logo).url()}
                alt={partner.name}
                fill
                className="w-full object-contain rounded-md bg-muted dark:bg-muted-foreground"
              />
            </div>
          </div>

          <div className="flex-1">
            <CardHeader>
              <CardTitle className="text-3xl">{partner.name}</CardTitle>
              {partner.events
                .filter((ev) => ev.type)
                .map((ev) => (
                  <CardDescription key={ev.title}>
                    {ev.type} - {ev.title}
                  </CardDescription>
                ))}
            </CardHeader>

            <CardContent>{partner.description}</CardContent>
            <CardFooter>
              {partner.website ? (
                <Link href={partner.website} target="_blank">
                  <Button aria-label="website link">
                    <LinkIcon size={20} />
                    &nbsp;Visit Website
                  </Button>
                </Link>
              ) : null}
            </CardFooter>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default Member;
