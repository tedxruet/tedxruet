import { Button } from "@/components/ui/button";
import { FacebookIcon, LinkedinIcon, MapPinIcon } from "lucide-react";

const contact = {
  phone: "+880-1881-616361",
  email: "tedx.ruet@yahoo.com",
  facebook_link: "https://web.facebook.com/TEDxRUETdiscoveringdimensions/",
  linkedin_link: "https://www.linkedin.com/company/tedxruet-local2global/",
};

export default function Footer() {
  return (
    <div className="w-full px-4 py-12 border-t mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p>Contact Us</p>
            <a href={`tel:${contact.phone}`} className="text-xl">
              {contact.phone}
            </a>
            <p className="mt-6">Email Us</p>
            <a href={`mailto:${contact.email}`} className="text-xl">
              {contact.email}
            </a>
          </div>
          <div>
            <p>Find us on</p>
            <div className="flex gap-4 mt-4 social-buttons">
              <a
                href={contact.facebook_link}
                referrerPolicy="no-referrer"
                target="_blank"
              >
                <Button variant="secondary" aria-label="Facebook Link">
                  <FacebookIcon />
                </Button>
              </a>

              <a
                href={contact.linkedin_link}
                referrerPolicy="no-referrer"
                target="_blank"
              >
                <Button variant="secondary" aria-label="Linkedin Link">
                  <LinkedinIcon />
                </Button>
              </a>
            </div>
            <p className="mt-6">
              <MapPinIcon className="inline" /> RUET, Kazla, Rajshahi-6204,
              Bangladesh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
