import Image from "next/image";
import { Button } from "@/components/ui/button";

import "./animate-text.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mt-6 p-2">
      <section aria-label="Hero Section" className="rounded">
        <div className="h-72 md:h-80 lg:h-96 overflow-hidden relative rounded-md">
          <Image
            src={"/images/tedx_cover.webp"}
            fill
            alt="Homepage Cover"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 dark:bg-black bg-white opacity-10"></div>
          <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-5xl lg:text-6xl text-center text-white mb-8 font-light">
              Discovering Dimensions
            </h1>
            <Link href={"/events"}>
              <Button
                className="uppercase mx-auto block"
                variant={"default"}
                size={"lg"}
              >
                View This Event
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
