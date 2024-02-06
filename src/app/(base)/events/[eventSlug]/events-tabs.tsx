"use client";
import { PortableText } from "@portabletext/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { FullEventData } from "@/lib/types";
import AnnouncingSoonCard from "@/components/AnnouncingSoonCard";
import SpeakerCard from "@/components/SpeakerCard";
import MemberCard from "@/components/MemberCard";
import { usePathname, useRouter } from "next/navigation";

export const EventsTabs = ({
  event,
  value,
}: {
  event: FullEventData;
  value: string;
}) => {
  const router = useRouter();
  const pathName = usePathname();

  const onTabChange = (value: string) => {
    console.log("value", value);
    router.push(pathName + "#tabs?tab=" + value, {
      forceOptimisticNavigation: true,
    });
  };

  return (
    <Tabs id="tabs" defaultValue="description">
      <TabsList className="justify-start bg-inherit h-12 overflow-x-auto">
        <TabsTrigger value="description" className="md:text-lg">
          Description
        </TabsTrigger>
        <TabsTrigger value="speakers" className="md:text-lg">
          Speakers
        </TabsTrigger>
        <TabsTrigger value="mentors" className="md:text-lg">
          Mentors
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
            {event.speakers?.length ? null : <AnnouncingSoonCard />}
          </div>
        </section>
      </TabsContent>
      <TabsContent value="mentors">
        <section aria-label="Mentors" className="mt-8">
          <h2 className="text-4xl mb-8">Mentors</h2>
          <div className="flex flex-wrap">
            {event.mentors?.map((member) => (
              <div key={member.slug} className="p-1 md:w-3/12 sm:w-6/12 w-full">
                <MemberCard member={{ ...member, post: "Mentor" }} />
              </div>
            ))}
          </div>
          {event.members?.length ? null : <AnnouncingSoonCard />}
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
          {event.members?.length ? null : <AnnouncingSoonCard />}
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
                Not uploaded yet.
              </p>
            </div>
          )}
        </section>
      </TabsContent>
    </Tabs>
  );
};

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
        />
      </Card>
    </DialogTrigger>
    <DialogContent className="min-h-[500px]">
      <Image
        src={urlFor(img).height(500).url()}
        blurDataURL={urlFor(img).height(50).url()}
        alt={`gallery photo`}
        className="object-contain"
        fill
      />
    </DialogContent>
  </Dialog>
);
