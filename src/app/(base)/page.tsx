import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SpeakerCard from "@/components/SpeakerCard";
import MemberCard from "@/components/MemberCard";
import SponsorCard from "@/components/SponsorCard";
import { getHomepageData } from "@/lib/sanity/site";

export const revalidate = 3600;

export default async function Home() {
  const data = await getHomepageData();

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return (
    <main className="container mt-6 p-2">
      <section aria-label="Hero Section" className="rounded">
        <div className="h-72 md:h-80 lg:h-96 overflow-hidden relative rounded-md">
          <Image
            src={data.bannerUrl}
            fill
            alt="Homepage Cover"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-background opacity-10"></div>
          <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-5xl lg:text-6xl text-center mb-8 dark:font-light drop-shadow-text">
              {data.tagline}
            </h1>
            <Link href={`/events/${data.event.slug}`}>
              <Button
                className="uppercase mx-auto block drop-shadow-text"
                variant={"default"}
                size={"lg"}
              >
                Join This Event
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section aria-label="Speakers" className="mt-12">
        <h2 className="text-center text-4xl mb-8">Meet The Speakers</h2>
        <div className="flex overflow-auto md:flex-wrap md:justify-center lg:max-w-screen-lg mx-auto">
          {data.event.speakers.map((speaker) => (
            <div
              key={speaker.slug}
              className="p-1 md:p-2 md:w-1/4 min-w-[300px] md:min-w-0"
            >
              <SpeakerCard speaker={speaker} />
            </div>
          ))}
        </div>
      </section>
      <section
        aria-label="About TEDxRUET"
        className="mt-12 py-16 px-4 relative rounded-md text-white overflow-hidden"
      >
        <Image
          src={"/images/tedxruet-stage.JPG"}
          fill
          className="object-cover -z-[2] filter blur-[4px]"
          alt="About TEDxRUET bg."
        />
        <div className="overlay bg-black absolute inset-0 -z-[1] opacity-20"></div>
        <h2 className="text-center text-4xl mb-8">About TEDxRUET</h2>

        <div className="max-w-screen-md mx-auto">
          <p className="text-lg md:text-xl text-justify">
            {data.about.tedxruet}
          </p>
        </div>
      </section>
      <section aria-label="Partners" className="mt-12">
        <h2 className="text-center text-4xl mb-8">Our Partners</h2>
        <div className="flex overflow-auto md:flex-wrap md:justify-center mx-auto 2xl:max-w-screen-2xl bg-muted dark:bg-muted-foreground rounded-md">
          {data.event.sponsors.map((sponsor) => (
            <div
              key={sponsor.slug}
              className="p-1 md:p-2 md:w-1/4 xl:w-1/5 min-w-[240px] md:min-w-0"
            >
              <SponsorCard sponsor={sponsor} />
            </div>
          ))}
        </div>
      </section>
      <section aria-label="About TED and TEDx">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-10">
          <div>
            <h2 className="text-center text-4xl mb-8">What is TEDx?</h2>
            <p className="text-lg md:text-xl text-justify">{data.about.tedx}</p>
          </div>
          <div>
            <h2 className="text-center text-4xl mb-8">About TED</h2>
            <p className="text-lg md:text-xl text-justify">{data.about.ted}</p>
          </div>
        </div>
      </section>
      <section aria-label="Organizing Team" className="mt-12">
        <h2 className="text-center text-4xl mb-8">Organizing Team</h2>
        <div className="flex overflow-auto md:flex-wrap mx-auto xl:max-w-screen-xl">
          {data.event.members.map((member) => (
            <div
              key={member.slug}
              className="p-1 md:w-2/12 lg:w-[14.28%] min-w-[150px] md:min-w-0"
            >
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
