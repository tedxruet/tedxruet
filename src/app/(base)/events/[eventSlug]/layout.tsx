import { Suspense } from "react";
import { EventNav } from "./event-nav";
import { LoadingSkeleton } from "./loading-skeleton";

type Props = {
  children: React.ReactNode;
  params: { eventSlug: string };
};

const EventLayout = async ({ params: { eventSlug }, children }: Props) => {
  return (
    <>
      <div className="md:fixed md:top-16 md:left-0 md:pl-4 md:w-56 xl:left-[calc(100vw/2-640px)]">
        <EventNav
          eventSlug={eventSlug}
          className="flex flex-shrink-0 overflow-x-auto h-12 pl-2 md:w-full md:pl-4 md:pr-4 mt-6 md:gap-3 md:flex-col md:h-auto md:z-[1]"
        />
      </div>

      <main className="container xl:max-w-screen-xl px-2 md:px-4">
        <div className="md:ml-56 mt-6 min-h-[calc(100vh-100px)]">
          <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
        </div>
      </main>
    </>
  );
};

export default EventLayout;
