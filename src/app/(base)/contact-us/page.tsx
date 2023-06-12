import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getContactData } from "@/lib/sanity/site";
import { FacebookIcon, LinkedinIcon, MapPinIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact TEDxRUET team.",
};

const pageSize = 5;

const ContactUs = async () => {
  const data = await getContactData();
  return (
    <main className="container p-2 min-h-screen">
      <h1 className="text-4xl mt-4 lg:mt-12 mb-8">Contact Us</h1>
      <div className="container mx-auto lg:max-w-screen-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p>Phone No.</p>
            <a href={`tel:${data.contact.phone1}`} className="text-xl block">
              {data.contact.phone1}
            </a>
            {data.contact.phone2 ? (
              <a href={`tel:${data.contact.phone2}`} className="text-xl block">
                {data.contact.phone2}
              </a>
            ) : null}
            <p className="mt-6">Email:</p>
            <a href={`mailto:${data.contact.email}`} className="text-xl">
              {data.contact.email}
            </a>
            <p className="mt-6">Social media:</p>
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
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
                <CardDescription>
                  <MapPinIcon className="inline" /> {data.contact.address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.5093160526635!2d88.62617181487096!3d24.363579570991853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefd0a55ea957%3A0x2f9cac3357d62617!2sRajshahi%20University%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sbd!4v1644097925634!5m2!1sen!2sbd"
                  className="rounded-sm border-0 w-full h-full"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
