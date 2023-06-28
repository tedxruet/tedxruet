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

export async function generateMetadata({
  params: { memberSlug },
}: Props): Promise<Metadata> {
  const member = await getMember(memberSlug);
  const post = member.events
    .filter((ev) => ev.post)
    .map((ev) => `${ev.post} - ${ev.title}`)
    .join(", ");

  return {
    title: `${member.name}`,
    description: post,
    openGraph: {
      images: [urlFor(member.photo).width(500).url()],
      description: post,
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
      <div className="mt-4 lg:mt-8"></div>
      <Card className="border-none shadow-none">
        <div className="flex flex-col sm:flex-row">
          <div className="aspect-square sm:w-64 md:w-80 lg:w-96 max-w-xs mx-auto w-full sm:max-w-none sm:mx-0">
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
                .filter((ev) => ev.mentor)
                .map((ev) => (
                  <CardDescription key={ev.title}>
                    Mentor - {ev.title}
                  </CardDescription>
                ))}
              {member.events
                .filter((ev) => ev.post)
                .map((ev) => (
                  <CardDescription key={ev.title}>
                    {ev.post} - {ev.title}
                  </CardDescription>
                ))}
            </CardHeader>

            {member.bio ? <CardContent>{member.bio}</CardContent> : null}
            {member.social ? (
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
            ) : null}
          </div>
        </div>
      </Card>
    </main>
  );
};

export default Member;
