import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEvents } from "@/lib/sanity/events";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const revalidate = 3600;

const Events = async () => {
  const events = await getEvents();
  return (
    <main className="container p-2 min-h-screen">
      <h1 className="text-4xl mt-12 mb-8">TEDxRUET Events</h1>
      <div className="max-w-screen-lg">
        {events.map((ev) => (
          <Card key={ev.slug} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1">
                <Image
                  src={ev.coverUrl}
                  alt={ev.title}
                  width={500}
                  height={500}
                />
              </div>

              <div className="flex-1">
                <CardHeader>
                  <CardTitle className="text-2xl"> {ev.title}</CardTitle>
                  <CardDescription className="line-clamp-4">
                    {ev.preamble}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={`/events/${ev.slug}`}>
                    <Button>View Event</Button>
                  </Link>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Events;
