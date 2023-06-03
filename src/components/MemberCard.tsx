"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const MemberCard = ({
  member,
}: {
  member: {
    slug: string;
    name: string;
    post: string;
    photoUrl: string;
  };
}) => {
  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <Card className="h-full overflow-hidden hover:shadow-md hover:bg-primary-foreground transition duration-300">
          <Image
            src={member.photoUrl}
            width={350}
            height={600}
            alt={member.name}
            className="h-64 w-full object-cover"
            loading="lazy"
          />
        </Card>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-start">
          <div className="flex-1">
            <h5 className="line-clamp-2">{member.name}</h5>
            <p className="text-sm line-clamp-2">{member.post}</p>
          </div>
          <div>
            <Link href={`/members/${member.slug}`}>
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

export default MemberCard;
