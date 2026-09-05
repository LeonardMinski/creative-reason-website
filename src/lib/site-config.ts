/**
 * Central site configuration.
 */
export const siteConfig = {
  name: "Creative Reason",
  legalName: "Creative Reason",
  tagline: "Ideas, designed into reality.",
  description:
    "Creative Reason is an independent UX, design and technology studio based in London, working across UX consultancy, digital product design and design engineering.",
  url: "https://creativereason.co.uk",
  location: "London, UK",
  contactEmail: "creativereasonhq@gmail.com",
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
