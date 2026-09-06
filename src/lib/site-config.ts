/**
 * Central site configuration.
 */
export const siteConfig = {
  name: "Creative Reason",
  legalName: "Creative Reason",
  tagline: "Ideas, designed into reality.",
  description:
    "Creative Reason is the independent product studio of Leonard Minski, combining product thinking, design and software engineering to take digital products from problem definition to shipped software.",
  url: "https://creativereason.co.uk",
  location: "London, UK",
  // Depends on the hello@creativereason.co.uk mailbox being live — flag if it isn't yet.
  contactEmail: "hello@creativereason.co.uk",
  founder: "Leonard Minski",
  social: {
    twitter: "",
    github: "",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "Consultancy", href: "/consultancy" },
  { label: "About the Founder", href: "/studio" },
  { label: "Contact", href: "/contact" },
];
