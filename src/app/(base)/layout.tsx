import { getEvents } from "@/lib/sanity/events";
import Footer from "./Footer";
import Header from "./Header";
import { Suspense } from "react";
import LoadingScreen from "./loading";
import { getContactData } from "@/lib/sanity/site";

export const revalidate = 3600;

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, contact] = await Promise.all([getEvents(), getContactData()]);

  return (
    <>
      <Header events={events} />
      <div className="h-28 md:h-16"></div>
      <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      <Footer data={contact} />
    </>
  );
}
