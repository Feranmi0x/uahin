export const navItems = [
  { label: "Our Work", to: "/our-work" },
  { label: "Impact", to: "/impact" },
  { label: "Stories", to: "/stories" },
  { label: "About", to: "/about" },
];
export const programs = [
  {
    title: "Community Food Support",
    location: "Edo State",
    stat: "Project executed",
    image: "/edo.jpg",
    description:
      "Community food support projects led by Upliftment Against Hunger Initiative NG (UAHIN) in Edo State with local support and community oversight.",
  },
  {
    title: "Community Food Support",
    location: "Osun State",
    stat: "Project executed",
    image: "/osungboyega.jpg",
    description:
      "UAHIN food support work in Osun State reached households with practical relief and community coordination.",
  },
  {
    title: "Community Food Support",
    location: "Ekiti State",
    stat: "Project executed across the state",
    image: "/ekitifayemi.jpg",
    description:
      "Food support initiatives in Ekiti State brought relief to families through local leadership and coordination across communities.",
  },
];
export const articles = [];
export const sponsors = [
  "Edo State communities",
  "Ekiti State communities",
  "Osun State communities",
  "UAHIN volunteers",
  "Local food relief partners",
];
export const impactStats = [
  { value: "3", label: "states reached" },
  { value: "6", label: "community food support projects" },
  { value: "Community-led", label: "hunger response" },
];
export const pageCopy = {
  "/our-work": {
    eyebrow: "Our work",
    title: "Practical support, built with communities.",
    description:
      "We pair immediate food relief with long-term pathways to resilience, always led by the people closest to the challenge.",
    image: programs[2].image,
  },
  "/impact": {
    eyebrow: "Our impact",
    title: "Progress you can see, measure and trust.",
    description:
      "Every intervention is shaped with local partners and tracked against outcomes that matter to families.",
    image: programs[0].image,
  },
  "/about": {
    eyebrow: "About UAHIN",
    title: "A country where every person can thrive.",
    description:
      "Upliftment Against Hunger Initiative NG (UAHIN) is a Nigerian-led humanitarian organization working across food security, community response, and local resilience.",
    image:
      "https://images.unsplash.com/photo-1504159506876-f8338247a14a?auto=format&fit=crop&w=1200&q=85",
  },
};
export const articleBody = [];
export const values = [
  {
    title: "Dignity first",
    text: "People are partners in our work, never problems to be solved.",
  },
  {
    title: "Local leadership",
    text: "The best answers are already present in the communities we serve.",
  },
  {
    title: "Open by default",
    text: "We share what we learn, what works and where every contribution goes.",
  },
];
export const getArticle = () => undefined;
export const formatNaira = (value) =>
  new Intl.NumberFormat("en-NG").format(value);
