import { Suspense } from "react";
import LoadingScreen from "./loading";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}
