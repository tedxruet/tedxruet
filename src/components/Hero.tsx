"use client";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "@/styles/slider.css";

import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
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
        <Swiper modules={[Pagination]} pagination={{ enabled: true }} loop>
          {banners.map((banner, i) => (
            <SwiperSlide key={i}>
              <div className="aspect-video md:aspect-[16/6] lg:aspect-[16/5] relative z-0 md:rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black z-[1] opacity-30"></div>
                <Image
                  src={banner}
                  fill
                  alt="Banner image"
                  className="object-cover select-none"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
