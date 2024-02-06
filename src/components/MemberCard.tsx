import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Link href={`/members/${member.slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-md hover:bg-primary-foreground transition duration-300">
        <div className="aspect-square relative">
          <Image
            src={member.photoUrl}
            alt={member.name}
            width={250}
            height={250}
            className="object-cover size-full"
            loading="lazy"
          />
        </div>
        <CardHeader>
          <CardTitle>{member.name}</CardTitle>
          <CardDescription>{member.post}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default MemberCard;
