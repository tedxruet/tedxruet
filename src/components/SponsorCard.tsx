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
    <Popover>
      <PopoverTrigger className="w-full">
        <Card className="h-full overflow-hidden">
          <Image
            src={sponsor.logoUrl}
            width={350}
            height={350}
            alt={sponsor.name}
            className="aspect-square w-full object-contain bg-muted dark:bg-muted-foreground"
            loading="lazy"
          />
        </Card>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-start">
          <div className="flex-1">
            <h5 className="line-clamp-2">{sponsor.name}</h5>
            <p className="text-sm line-clamp-2">{sponsor.type}</p>
          </div>
          <div>
            <Link href={`/sponsors/${sponsor.slug}`}>
              <Button variant={"ghost"} size={"sm"} className="mt-2">
                <ExternalLinkIcon />
              </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SponsorCard;
