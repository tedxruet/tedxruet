import { LoaderIcon } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="grid place-items-center md:min-h-[calc(100vh-56px)] min-h-[calc(100vh-100px)]">
      <LoaderIcon size={24} className="animate-spin" />
    </div>
  );
};

export default LoadingScreen;
