import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import { getSpeaker } from "@/lib/sanity/speakers";
import Image from "next/image";

type Prop = { params: { speakerSlug: string } };

const Speaker = async ({ params: { speakerSlug } }: Prop) => {
  const speaker = await getSpeaker(speakerSlug);

  return (
    <main className="container xl:max-w-screen-xl p-2 min-h-screen">
      <h1 className="text-4xl mt-12 mb-8">{}</h1>
      <Card className="border-none shadow-none">
        <div className="flex flex-col sm:flex-row">
          <div className="aspect-square sm:w-64 md:w-80 lg:w-96 max-w-sm mx-auto sm:max-w-none sm:mx-0">
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
              <CardTitle>{speaker.name}</CardTitle>
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
