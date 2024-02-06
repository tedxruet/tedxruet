"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

const HeroSection = ({
  banners,
  title,
  subtitle,
  slug,
}: {
  banners: string[];
  title: string;
  subtitle: string;
  slug: string;
}) => {
  return (
    <section aria-label="Hero Section" className="md:container">
      <div className="relative">
        <Carousel
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        >
          <CarouselContent>
            {banners.map((banner, i) => (
              <CarouselItem key={i}>
                <Image
                  src={banner}
                  width={1360}
                  height={460}
                  alt="Banner image"
                  className="h-64 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden block object-cover select-none"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-x-0 hidden lg:grid place-items-center z-[1]">
          <HeadingSection title={title} subtitle={subtitle} slug={slug} />
        </div>
      </div>
      <div className="lg:hidden">
        <HeadingSection title={title} subtitle={subtitle} slug={slug} />
      </div>
    </section>
  );
};

export default HeroSection;

const HeadingSection = ({
  title,
  subtitle,
  slug,
}: {
  title: string;
  subtitle: string;
  slug: string;
}) => (
  <Card className="border-0 lg:border bg-card/80 shadow-none text-center">
    <CardHeader>
      <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-normal">
        {title}
      </CardTitle>
      <CardDescription className="lg:text-lg">{subtitle}</CardDescription>
    </CardHeader>
    <CardFooter className="justify-center">
      <Link href={"/events/" + slug}>
        <Button
          size={"lg"}
          className="bg-[hsl(9,100%,51%)] hover:bg-[hsl(9,100%,45%)]"
        >
          Join Event
        </Button>
      </Link>
    </CardFooter>
  </Card>
);
