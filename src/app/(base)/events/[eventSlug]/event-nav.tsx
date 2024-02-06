"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  SpeechIcon,
  HandshakeIcon,
  UsersIcon,
  ImageIcon,
  Contact2Icon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface Props {
  className?: string;
  eventSlug: string;
}

export function EventNav({ className, eventSlug }: Props) {
  const path = usePathname();
  const routes = useMemo(
    () => [
      {
        title: "Event",
        href: "/events/" + eventSlug,
        icon: CalendarCheck,
      },
      {
        title: "Speakers",
        href: `/events/${eventSlug}/speakers`,
        icon: SpeechIcon,
      },
      {
        title: "Partners",
        href: `/events/${eventSlug}/partners`,
        icon: HandshakeIcon,
      },
      {
        title: "Mentors",
        href: `/events/${eventSlug}/mentors`,
        icon: Contact2Icon,
      },
      {
        title: "Organizers",
        href: `/events/${eventSlug}/team`,
        icon: UsersIcon,
      },
      {
        title: "Gallery",
        href: `/events/${eventSlug}/gallery`,
        icon: ImageIcon,
      },
    ],
    [eventSlug]
  );

  return (
    <nav className={cn(className)}>
      {routes.map((item) => (
        <Link href={item.href} key={item.title}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm md:text-lg font-medium hover:bg-accent hover:text-accent-foreground",
              path === item.href
                ? "bg-accent"
                : "transparent text-foreground/70"
            )}
          >
            <item.icon className="hidden md:block mr-2 h-5 w-5" />
            <span>{item.title}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
