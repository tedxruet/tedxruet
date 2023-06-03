export type TedxEvent = {
  _id: string;
  title: string;
  venue: string;
  cover: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  slug: { current: string; _type: "slug" };
  time: string;
  registrationLink: string | null;
  preamble: string;
};
