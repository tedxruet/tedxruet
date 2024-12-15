import React from "react";
import { getEventsList } from "@/lib/sanity/events";
import EventSelect from "./EventSelect";
import Loading from "./loading";

type Props = {
  children: React.ReactNode;
};

export const revalidate = 0;

const TeamLayout = async ({ children }: Props) => {
  const eventsList = await getEventsList();

  return (
    <main className="container xl:max-w-screen-xl p-2 min-h-screen">
      <div className="flex flex-wrap mt-4 lg:mt-12 mb-8 justify-between gap-4">
        <h1 className="text-4xl">Organizing Team</h1>
        <EventSelect events={eventsList} />
      </div>
      <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
    </main>
  );
};

export default TeamLayout;
