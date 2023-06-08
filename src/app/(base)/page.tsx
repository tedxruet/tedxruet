import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getLastEvent } from "@/lib/sanity/events";
import SpeakerCard from "@/components/SpeakerCard";
import MemberCard from "@/components/MemberCard";

export const revalidate = 3600;

export default async function Home() {
  const lastEvent = await getLastEvent();

  return (
    <main className="container mt-6 p-2">
      <section aria-label="Hero Section" className="rounded">
        <div className="h-72 md:h-80 lg:h-96 overflow-hidden relative rounded-md">
          <Image
            src={"/images/tedx_cover.webp"}
            fill
            alt="Homepage Cover"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-background opacity-10"></div>
          <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-5xl lg:text-6xl text-center mb-8 dark:font-light drop-shadow-text">
              {lastEvent.title}
            </h1>
            <Link href={`/events/${lastEvent.slug}`}>
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
          {lastEvent.speakers.map((speaker) => (
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
            Igniting Minds, Catalyzing Change. Join us for an immersive
            experience where inspiring speakers and thought-provoking talks come
            together to foster innovation and empower individuals to make a
            difference. Explore ideas, connect with like-minded individuals, and
            be a part of the TEDxRUET community driving positive impact.
          </p>
        </div>
      </section>

      <section aria-label="Organizing Team" className="mt-12">
        <h2 className="text-center text-4xl mb-8">Organizing Team</h2>
        <div className="flex overflow-auto md:flex-wrap mx-auto xl:max-w-screen-xl">
          {lastEvent.members.map((member) => (
            <div
              key={member.slug}
              className="p-1 md:w-2/12 lg:w-[14.28%] min-w-[150px] md:min-w-0"
            >
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      </section>
      <section aria-label="About TED and TEDx">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-10">
          <div>
            <h2 className="text-center text-4xl mb-8">What is TEDx?</h2>
            <p className="text-lg md:text-xl text-justify">
              TEDx is a global grassroots initiative inspired by TED&apos;s
              mission to discover and spread &quot;ideas worth spreading.&quot;
              TEDx events are organized by passionate individuals who aim to
              uncover new ideas, share local research, and ignite meaningful
              conversations in their communities. While independently organized,
              TEDx events follow TED&apos;s format and guidelines, including
              curated talks from live speakers and recorded TED Talks. With over
              3000 events held annually, TEDx brings the spirit of TED to local
              communities worldwide, fostering a platform for knowledge exchange
              and inspiration.
            </p>
          </div>
          <div>
            <h2 className="text-center text-4xl mb-8">About TED</h2>
            <p className="text-lg md:text-xl text-justify">
              TED is on a mission to discover and spread ideas that spark
              imagination, embrace possibility and catalyze impact. Our
              organization is devoted to curiosity, reason, wonder and the
              pursuit of knowledge — without an agenda. We welcome people from
              every discipline and culture who seek a deeper understanding of
              the world and connection with others, and we invite everyone to
              engage with ideas and activate them in your community.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
