import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { getEventGallery } from "@/lib/sanity/events";
import { notFound } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  params: { eventSlug: string };
};

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventGallery(params.eventSlug);

  return {
    title: "Gallery -" + event.title,
    description: event.preamble,
    openGraph: { images: [event.coverUrl], description: event.preamble },
  };
}

export default async function AboutPage({ params: { eventSlug } }: Props) {
  const event = await getEventGallery(eventSlug);
  if (!event) {
    notFound();
  }

  return (
    <div>
      <CardTitle className="text-3xl mb-2 md:text-4xl text-balance">
        Gallery - {event.title}
      </CardTitle>
      <p className="text-muted-foreground mb-6">
        Gallery of <span className="font-medium">{event.title}</span> event
      </p>
      <div className="flex flex-wrap">
        {event.gallery?.map((img, i) => (
          <div key={i} className="p-1 md:w-4/12">
            <PhotoCard img={img} />
          </div>
        ))}
      </div>
      {event.gallery?.length ? null : (
        <div className="p-2 w-full rounded-md bg-muted">
          <p className="text-muted-foreground text-center">Not uploaded yet.</p>
        </div>
      )}
    </div>
  );
}

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
