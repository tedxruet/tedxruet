"use client";

import * as React from "react";
import Link from "next/link";
import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { LatestEventData } from "@/lib/types";

const community: { title: string; href: string; description: string }[] = [
  {
    title: "Speakers",
    href: "/speakers",
    description:
      "TEDxRUET Speakers - Inspiring voices that will spark ideas and ignite change.",
  },
  {
    title: "Partners",
    href: "/partners",
    description:
      "Explore the collaborations that fuel our inspiring talks and unforgettable events.",
  },
  {
    title: "Organizing Team",
    href: "/team",
    description:
      "Meet the TEDxRUET organizing team - Driven, Inspiring, and Transformative!",
  },
];

export default function Header({ events }: { events: LatestEventData[] }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 5 ? true : false);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 transition duration-300 z-10 bg-background",
        scrolled ? "shadow-md bg-secondary" : ""
      )}
    >
      <div className="flex flex-col md:items-center p-2 md:flex-row gap-2 md:gap-6">
        <div className="flex justify-between">
          <Link href="/">
            <Image
              src="/images/brand-logo-light.png"
              className="dark:hidden"
              width={197}
              height={44}
              alt="TEDxRUET logo"
            />
            <Image
              src="/images/brand-logo-dark.png"
              className="hidden dark:inline"
              width={197}
              height={44}
              alt="TEDxRUET logo"
            />
          </Link>

          <div className="md:hidden">
            <ThemeSwitch />
          </div>
        </div>
        <div className="mr-auto ml-0">
          <Navigation events={events} />
        </div>
        <div className="hidden md:block">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}

function Navigation({ events }: { events: LatestEventData[] }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Events</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[450px] lg:w-[540px] lg:grid-cols-[.8fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/events"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      TEDxRUET Events
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Discover a World of Thought-Provoking Talks, Engrossing
                      Performances, and Collaborative Discussions.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {events.map((ev) => (
                <ListItem
                  href={`/events/${ev.slug}`}
                  title={ev.title}
                  key={ev.slug}
                >
                  {ev.preamble}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Community</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 grid-cols-1 md:grid-cols-2 md:w-[600px]">
              {community.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact-us" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          href={href!}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const ThemeSwitch = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      return;
    }
    document.documentElement.classList.remove("dark");
  }, [theme]);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as string | undefined;
    if (savedTheme === "light") {
      return setTheme("light");
    }
  }, []);

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.removeItem("theme");
      return;
    }
    setTheme("light");
    localStorage.setItem("theme", "light");
  };

  return (
    <Button
      variant={"ghost"}
      onClick={handleThemeChange}
      aria-label="Swith theme"
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:inline" />
    </Button>
  );
};
