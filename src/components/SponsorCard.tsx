import { Card } from "@/components/ui/card";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const SponsorCard = ({
  sponsor,
}: {
  sponsor: {
    slug: string;
    name: string;
    type: string;
    logoUrl: string;
  };
}) => {
  return (
    <Link href={`/sponsors/${sponsor.slug}`} aria-label={sponsor.name}>
      <Card className="h-full overflow-hidden bg-transparent border-none">
        <Image
          src={sponsor.logoUrl}
          width={350}
          height={350}
          alt={sponsor.name}
          className="aspect-square w-full object-contain"
          loading="lazy"
        />
      </Card>
    </Link>
  );
};

export default SponsorCard;
