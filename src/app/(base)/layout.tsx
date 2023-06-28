import { getEvents } from "@/lib/sanity/events";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Suspense } from "react";
import LoadingScreen from "./loading";
import { getContactData } from "@/lib/sanity/site";

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, contact] = await Promise.all([getEvents(), getContactData()]);

  return (
    <>
      <Header events={events} />
      <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      <Footer data={contact} />
    </>
  );
}
