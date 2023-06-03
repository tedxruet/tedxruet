import Footer from "./Footer";
import Header from "./Header";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="h-28 md:h-16"></div>
      {children}
      <Footer />
    </>
  );
}
