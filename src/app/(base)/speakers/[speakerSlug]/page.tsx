import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import { getSpeaker } from "@/lib/sanity/speakers";
import type { Metadata } from "next";

type Props = { params: { speakerSlug: string } };

export async function generateMetadata({
  params: { speakerSlug },
}: Props): Promise<Metadata> {
  const speaker = await getSpeaker(speakerSlug);

  return {
    title: `${speaker.name}, Speaker`,
    description: speaker.designation,
    openGraph: {
      images: [urlFor(speaker.photo).width(600).url()],
      description: `${speaker.name}, Speaker`,
    },
  };
}

const Speaker = async ({ params: { speakerSlug } }: Props) => {
  const speaker = await getSpeaker(speakerSlug);

  return (
    <main className="container xl:max-w-screen-xl p-2 min-h-screen">
      <div className="mt-4 lg:mt-8"></div>
      <Card className="border-none shadow-none">
        <div className="flex flex-col sm:flex-row">
          <div className="aspect-square sm:w-64 md:w-80 lg:w-96 max-w-xs w-full mx-auto sm:max-w-none sm:mx-0">
            <Image
              src={urlFor(speaker.photo).url()}
              alt={speaker.name}
              width={500}
              height={500}
              className="w-full rounded-md"
            />
          </div>
          <div className="flex-1">
            <CardHeader>
              <CardTitle className="text-3xl">{speaker.name}</CardTitle>
              <CardDescription>{speaker.designation}</CardDescription>
            </CardHeader>
            <CardContent>{speaker.bio}</CardContent>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default Speaker;
