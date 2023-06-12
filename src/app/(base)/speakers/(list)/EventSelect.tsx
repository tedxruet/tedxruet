"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EventSelect = ({
  events,
}: {
  events: Array<{ title: string; slug: string }>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      defaultValue={searchParams.get("event") ?? events[0].slug}
      onValueChange={(val) => router.push(`/speakers?event=${val}`)}
    >
      <SelectTrigger className="max-w-xs">
        <SelectValue placeholder="Event" />
      </SelectTrigger>
      <SelectContent>
        {events.map((ev) => (
          <SelectItem value={ev.slug} key={ev.slug}>
            {ev.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default EventSelect;
