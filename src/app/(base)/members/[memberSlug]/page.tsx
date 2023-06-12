import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FacebookIcon, LinkedinIcon } from "lucide-react";
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
import { getMember } from "@/lib/sanity/members";
import type { Metadata } from "next";

type Props = { params: { memberSlug: string } };

export const revalidate = 86400;
export async function generateMetadata({
  params: { memberSlug },
}: Props): Promise<Metadata> {
  const member = await getMember(memberSlug);

  return {
    title: `${member.name}, Member`,
    description: member.bio ?? "TEDxRUET member",
    openGraph: {
      images: [urlFor(member.photo).width(600).url()],
      description: member.bio ?? "TEDxRUET member",
    },
  };
}

const Member = async ({ params: { memberSlug } }: Props) => {
  const member = await getMember(memberSlug);
  if (!member) {
    notFound();
  }

  return (
    <main className="container xl:max-w-screen-xl p-2 min-h-screen">
      <h1 className="text-4xl mt-12 mb-8">{}</h1>
      <Card className="border-none shadow-none">
        <div className="flex flex-col sm:flex-row">
          <div className="aspect-square sm:w-64 md:w-80 lg:w-96 max-w-sm mx-auto sm:max-w-none sm:mx-0">
            <Image
              src={urlFor(member.photo).url()}
              alt={member.name}
              width={500}
              height={500}
              className="w-full rounded-md"
            />
          </div>
          <div className="flex-1">
            <CardHeader>
              <CardTitle className="text-3xl">{member.name}</CardTitle>
              {member.events
                .filter((ev) => ev.post)
                .map((ev) => (
                  <CardDescription key={ev.title}>
                    {ev.post} - {ev.title}
                  </CardDescription>
                ))}
            </CardHeader>

            {member.bio ? <CardContent>{member.bio}</CardContent> : null}
            <CardFooter>
              Find me on-&nbsp;
              {member.social.facebook ? (
                <Link href={member.social.facebook} target="_blank">
                  <Button
                    variant={"secondary"}
                    size="sm"
                    aria-label="facebook link"
                  >
                    <FacebookIcon size={20} />
                  </Button>
                </Link>
              ) : null}
              &nbsp;
              {member.social.linkedin ? (
                <Link href={member.social.linkedin} target="_blank">
                  <Button
                    variant={"secondary"}
                    size="sm"
                    aria-label="linkedin link"
                  >
                    <LinkedinIcon size={20} />
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
