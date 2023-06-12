import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEvents } from "@/lib/sanity/events";
import { urlFor } from "@/lib/sanity";
import type { Metadata } from "next";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Events",
  description: "TEDx Rajshahi University of Engineering & Technology events.",
};

const Events = async () => {
  const events = await getEvents();
  return (
    <main className="container p-2 min-h-screen">
      <h1 className="text-4xl mt-12 mb-8">TEDxRUET Events</h1>
      <div className="max-w-screen-lg mx-auto flex flex-wrap gap-5">
        {events.map((ev) => (
          <Link href={`/events/${ev.slug}`} key={ev.slug} className="w-full">
            <Card
              key={ev.slug}
              className="overflow-hidden hover:bg-secondary transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row items-stretch">
                <Image
                  src={urlFor(ev.cover).height(350).url()}
                  alt={ev.title}
                  width={600}
                  height={250}
                  className="w-full h-56 md:max-w-sm object-cover"
                />

                <div className="flex-1">
                  <CardHeader>
                    <CardTitle className="text-2xl"> {ev.title}</CardTitle>
                    <CardDescription className="flex gap-2">
                      <CalendarIcon size={20} aria-label="Date and Time:" />{" "}
                      {dayjs(ev.time).format("MMM DD, YYYY hh:mm A (TZ)")}
                    </CardDescription>
                    <CardDescription className="flex gap-2">
                      <MapPinIcon size={20} aria-label="Event Venue:" />{" "}
                      {ev.venue}
                    </CardDescription>
                    <CardDescription className="line-clamp-4">
                      {ev.preamble}
                    </CardDescription>
                  </CardHeader>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Events;
