import { Button } from "@/components/ui/button";
import { SiteData } from "@/lib/types";
import { FacebookIcon, LinkedinIcon, MapPinIcon } from "lucide-react";

export default function Footer({
  data,
}: {
  data: Pick<SiteData, "social" | "contact">;
}) {
  return (
    <div className="w-full px-4 py-12 border-t mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p>Contact Us</p>
            <a href={`tel:${data.contact.phone1}`} className="text-xl block">
              {data.contact.phone1}
            </a>
            {data.contact.phone2 ? (
              <a href={`tel:${data.contact.phone2}`} className="text-xl block">
                {data.contact.phone2}
              </a>
            ) : null}
            <p className="mt-6">Email Us</p>
            <a href={`mailto:${data.contact.email}`} className="text-xl">
              {data.contact.email}
            </a>
          </div>
          <div>
            <p>Find us on</p>
            <div className="flex gap-4 mt-4 social-buttons">
              {data.social.facebook ? (
                <a
                  href={data.social.facebook}
                  referrerPolicy="no-referrer"
                  target="_blank"
                >
                  <Button variant="secondary" aria-label="Facebook Link">
                    <FacebookIcon />
                  </Button>
                </a>
              ) : null}
              {data.social.linkedin ? (
                <a
                  href={data.social.linkedin}
                  referrerPolicy="no-referrer"
                  target="_blank"
                >
                  <Button variant="secondary" aria-label="Linkedin Link">
                    <LinkedinIcon />
                  </Button>
                </a>
              ) : null}
            </div>
            <p className="mt-6">
              <MapPinIcon className="inline" /> {data.contact.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
