import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { PortableText } from "@portabletext/react";
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getEvent } from "@/lib/sanity/events";
import type { Metadata } from "next";
import { urlFor } from "@/lib/sanity";
import SponsorCard from "@/components/SponsorCard";
import MemberCard from "@/components/MemberCard";
import SpeakerCard from "@/components/SpeakerCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = { params: { eventSlug: string } };

export const revalidate = 300;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent(params.eventSlug);

  return {
    title: event.title,
    description: event.preamble,
    openGraph: { images: [event.coverUrl], description: event.preamble },
  };
}

const EventPage = async ({ params: { eventSlug } }: Props) => {
  const event = await getEvent(eventSlug);
  if (!event) {
    notFound();
  }

  return (
    <main className="container p-2">
      <div aria-label="Event" className="lg:max-w-screen-lg mx-auto">
        <Card className="border-none shadow-none">
          <Image
            src={event.coverUrl}
            alt={event.title}
            height={600}
            width={1200}
            className="h-52 md:h-64 lg:h-72 object-cover rounded-md mb-4"
          />
          <CardHeader className="px-0">
            <CardTitle className="text-3xl md:text-4xl">
              {event.title}
            </CardTitle>
            <CardDescription className="flex gap-2 pt-2">
              <CalendarIcon size={24} aria-label="Date and Time:" />{" "}
              {dayjs(event.time).format("MMM DD, YYYY hh:mm A (TZ)")}
            </CardDescription>
            <CardDescription className="flex gap-2 pt-2">
              <MapPinIcon size={24} aria-label="Event Venue:" /> {event.venue}
            </CardDescription>
            <CardDescription className="max-w-screen-md">
              {event.preamble}
            </CardDescription>
          </CardHeader>
          <CardFooter className="px-0">
            <Link legacyBehavior href={event.registrationLink ?? ""} passHref>
              <Button disabled={!event.registrationLink}>
                <LinkIcon size={18} />
                &nbsp;Registration Link
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start bg-inherit">
            <TabsTrigger value="description" className="md:text-lg">
              Description
            </TabsTrigger>
            <TabsTrigger value="speakers" className="md:text-lg">
              Speakers
            </TabsTrigger>
            <TabsTrigger value="team" className="md:text-lg">
              Team
            </TabsTrigger>
            <TabsTrigger value="gallery" className="md:text-lg">
              Gallery
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <article className="prose dark:prose-invert md:prose-lg max-w-screen-md mt-8">
              <h2 className="text-4xl font-normal">Event Description</h2>
              <PortableText
                value={event.content}
                components={{
                  types: {
                    image: ({ value }) => (
                      <Image
                        src={urlFor(value).url()}
                        alt={value.alt}
                        className="w-full h-auto"
                        width={0}
                        height={0}
                        unoptimized
                      />
                    ),
                  },
                }}
              />
            </article>
          </TabsContent>
          <TabsContent value="speakers">
            <section aria-label="Speakers" className="mt-8">
              <h2 className="text-4xl mb-8">Speakers</h2>

              <div className="flex flex-wrap justify-center lg:max-w-screen-lg mx-auto">
                {event.speakers?.map((speaker) => (
                  <div
                    key={speaker.slug}
                    className="p-1 md:p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs w-full"
                  >
                    <SpeakerCard
                      speaker={{
                        slug: speaker.slug,
                        designation: speaker.designation,
                        name: speaker.name,
                        photoUrl: urlFor(speaker.photo).height(450).url(),
                      }}
                    />
                  </div>
                ))}
                {event.speakers?.length ? null : (
                  <div className="p-2 w-full rounded-md bg-muted">
                    <p className="text-muted-foreground text-center">
                      No speakers found
                    </p>
                  </div>
                )}
              </div>
            </section>
          </TabsContent>
          <TabsContent value="team">
            <section aria-label="Organizing Team" className="mt-8">
              <h2 className="text-4xl mb-8">Organizing Team</h2>
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
              {event.members?.length ? null : (
                <div className="p-2 w-full rounded-md bg-muted">
                  <p className="text-muted-foreground text-center">
                    No members found
                  </p>
                </div>
              )}
            </section>
          </TabsContent>
          <TabsContent value="gallery">
            <section aria-label="Gallery" className="mt-8">
              <h2 className="text-4xl mb-8">Gallery</h2>

              <div className="flex flex-wrap">
                {event.gallery?.map((img, i) => (
                  <div key={i} className="p-1 md:w-4/12">
                    <PhotoCard img={img} />
                  </div>
                ))}
              </div>
              {event.gallery?.length ? null : (
                <div className="p-2 w-full rounded-md bg-muted">
                  <p className="text-muted-foreground text-center">
                    No photo found
                  </p>
                </div>
              )}
            </section>
          </TabsContent>
        </Tabs>
        <section aria-label="Partners" className="mt-12">
          <h3 className="text-center text-lg font-bold mb-2">
            {event.sponsors ? "Event Sponsored by:" : ""}
          </h3>
          <div className="flex flex-wrap justify-center mx-auto bg-muted dark:bg-muted-foreground rounded-md">
            {event.sponsors?.map((sponsor) => (
              <div
                key={sponsor.slug}
                className="p-1 md:p-2 md:w-1/3 min-w-[240px] md:min-w-0"
              >
                <SponsorCard sponsor={sponsor} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default EventPage;

const PhotoCard = ({ img }: { img: unknown }) => (
  <Dialog>
    <DialogTrigger>
      <Card className="overflow-hidden relative">
        <Image
          src={urlFor(img).width(450).height(450).url()}
          alt={`gallery photo`}
          className="object-cover"
          width={450}
          height={450}
          unoptimized
        />
      </Card>
    </DialogTrigger>
    <DialogContent className="min-h-[500px]">
      <Image
        src={urlFor(img).height(500).url()}
        blurDataURL={urlFor(img).height(50).url()}
        alt={`gallery photo`}
        className="object-contain"
        unoptimized
        fill
      />
    </DialogContent>
  </Dialog>
);
