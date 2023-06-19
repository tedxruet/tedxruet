import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AnnouncingSoonCard = () => {
  return (
    <Card className="max-w-sm mx-auto border-none shadow-none py-16">
      <CardHeader>
        <div className="text-center text-muted-foreground">
          <svg
            fill="currentColor"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28.886 28.885"
            className="w-16 h-16 mx-auto"
          >
            <g>
              <g>
                <g>
                  <path
                    d="M1.192,11.111C0.533,11.111,0,12.925,0,13.692c0,0.77,0.533,2.584,1.192,2.584h0.702l3.862,7.26h3.008l-2.575-6.919
				c7.22,1.226,12.877,5.418,12.877,5.418v-6.39v-3.903V5.35c0,0-7.746,5.761-16.684,5.761H1.192z"
                  />
                  <path d="M20.259,11.309v4.767c1.151,0,2.085-1.067,2.085-2.384C22.345,12.378,21.41,11.309,20.259,11.309z" />
                </g>
                <g>
                  <g>
                    <path
                      d="M23.255,13.601c0-0.346,0.278-0.625,0.625-0.625h4.38c0.346,0,0.626,0.279,0.626,0.625c0,0.347-0.28,0.627-0.626,0.627
					h-4.38C23.533,14.228,23.255,13.948,23.255,13.601z"
                    />
                  </g>
                  <g>
                    <path
                      d="M22.164,9.537c0-0.216,0.113-0.428,0.312-0.541l3.797-2.191c0.299-0.175,0.682-0.071,0.854,0.227
					c0.175,0.299,0.072,0.682-0.229,0.855l-3.795,2.191c-0.3,0.173-0.683,0.071-0.854-0.229C22.191,9.75,22.164,9.642,22.164,9.537z
					"
                    />
                  </g>
                  <g>
                    <path
                      d="M22.16,17.663c0-0.104,0.027-0.214,0.084-0.312c0.172-0.3,0.555-0.402,0.854-0.229l3.8,2.195
					c0.299,0.176,0.401,0.555,0.228,0.855c-0.171,0.297-0.556,0.4-0.854,0.228l-3.8-2.194C22.273,18.088,22.16,17.879,22.16,17.663z
					"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <CardTitle className="text-center text-muted-foreground">
          {"Announcing soon! Please stay tuned."}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default AnnouncingSoonCard;
