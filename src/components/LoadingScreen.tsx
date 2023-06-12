import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

const LoadingScreen = ({
  disableFullscreen,
}: {
  disableFullscreen?: boolean;
}) => {
  return (
    <div
      className={cn(
        "grid place-items-center",
        disableFullscreen
          ? "p-4"
          : "md:min-h-[calc(100vh-56px)] min-h-[calc(100vh-100px)]"
      )}
    >
      <LoaderIcon size={24} className="animate-spin" />
    </div>
  );
};

export default LoadingScreen;
