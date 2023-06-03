import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const SpeakerCard = ({
  speaker,
}: {
  speaker: {
    slug: string;
    name: string;
    designation: string;
    photoUrl: string;
  };
}) => {
  return (
    <Link href={`/speakers/${speaker.slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-md hover:bg-primary-foreground transition duration-300">
        <Image
          src={speaker.photoUrl}
          width={400}
          height={900}
          alt={speaker.name}
          className="h-72 w-full object-cover"
        />
        <CardHeader>
          <CardTitle>{speaker.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {speaker.designation}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default SpeakerCard;
