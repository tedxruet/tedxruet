import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SpeakerCard from "@/components/SpeakerCard";
import SponsorCard from "@/components/SponsorCard";
import HomeMemberCard from "@/components/HomeMemberCard";
import { getHomepageData } from "@/lib/sanity/site";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import AnnouncingSoonCard from "@/components/AnnouncingSoonCard";
import HeroSection from "@/components/Hero";
import { urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Home",
};

export const revalidate = 86400;

export default async function Home() {
  const data = await getHomepageData();

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return (
    <main>
      <HeroSection
        banners={data.banners.map((img) => urlFor(img).url())}
        title={data.title}
        subtitle={data.subtitle}
        slug={data.event.slug}
      />

      <section aria-label="Speakers" className="mt-12 container">
        <h2 className="text-center text-4xl mb-8">Meet The Speakers</h2>
        {data.speakers?.length ? (
          <div className="flex overflow-auto md:flex-wrap md:justify-center lg:max-w-screen-lg mx-auto">
            {data.speakers
              .map((speaker) => ({
                ...speaker,
                photoUrl: urlFor(speaker.photo).url(),
              }))
              .map((speaker) => (
                <div
                  key={speaker.slug}
                  className="p-1 md:p-2 md:w-1/4 min-w-[300px] md:min-w-0"
                >
                  <SpeakerCard speaker={speaker} />
                </div>
              ))}
          </div>
        ) : (
          <AnnouncingSoonCard />
        )}
      </section>
      <section
        aria-label="About TEDxRUET"
        className="mt-12 py-16 px-4 relative rounded-md text-white overflow-hidden container"
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
          <p className="md:text-lg lg:text-xl md:text-justify">
            {data.about.tedxruet}
          </p>
        </div>
      </section>

      <section aria-label="Partners" className="mt-12 container">
        <h2 className="text-center text-4xl mb-8">Our Partners</h2>
        {data.partners?.length ? (
          <div
            className={cn(
              "flex overflow-auto md:flex-wrap md:justify-center mx-auto 2xl:max-w-screen-2xl bg-muted dark:bg-muted-foreground rounded-md",
              data.partners.length === 1 ? "justify-center" : ""
            )}
          >
            {data.partners
              .map((partner) => ({
                ...partner,
                logoUrl: urlFor(partner.logo).url(),
              }))
              .map((partner) => (
                <div
                  key={partner.slug}
                  className="p-1 md:p-2 md:w-1/4 xl:w-1/5 min-w-[240px] md:min-w-0"
                >
                  <SponsorCard sponsor={partner} />
                </div>
              ))}
          </div>
        ) : (
          <AnnouncingSoonCard />
        )}
      </section>

      <section aria-label="About TED and TEDx" className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-10">
          <div>
            <h2 className="text-center text-4xl mb-8">What is TEDx?</h2>
            <p className="md:text-lg lg:text-xl md:text-justify">
              {data.about.tedx}
            </p>
          </div>
          <div>
            <h2 className="text-center text-4xl mb-8">About TED</h2>
            <p className="md:text-lg lg:text-xl md:text-justify">
              {data.about.ted}
            </p>
          </div>
        </div>
      </section>
      <section aria-label="Organizing Team" className="mt-12">
        <h2 className="text-center text-4xl mb-8">Organizing Team</h2>
        <div className="flex overflow-auto md:flex-wrap mx-auto xl:max-w-screen-xl">
          {data.event.members?.map((member) => (
            <div
              key={member.slug}
              className="p-1 md:w-2/12 lg:w-[14.28%] min-w-[150px] md:min-w-0"
            >
              <HomeMemberCard member={member} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
