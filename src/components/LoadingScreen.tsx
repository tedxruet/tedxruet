import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

const LoadingScreen = (
  { fullscreen }: { fullscreen?: boolean } = { fullscreen: true }
) => {
  return (
    <div
      className={cn(
        "grid place-items-center",
        fullscreen
          ? "md:min-h-[calc(100vh-56px)] min-h-[calc(100vh-100px)]"
          : "p-4"
      )}
    >
      <LoaderIcon size={24} className="animate-spin" />
    </div>
  );
};

export default LoadingScreen;
