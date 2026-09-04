/**
 * Placeholder testimonials, added at the site owner's explicit request to
 * hold the section's layout ahead of real client quotes. Deliberately
 * generic (first name + role, no company names or metrics) rather than
 * attributed to a specific real business — swap for genuine quotes as they
 * come in.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Leonard didn't just design our interface — he questioned the entire flow before touching a single screen. What we shipped was simpler than what we asked for, and it worked better.",
    name: "Sarah K.",
    role: "Product Lead",
  },
  {
    quote:
      "We came in with a vague idea and a messy Figma file. We left with a system we could actually build from. That's rare.",
    name: "James O.",
    role: "Founder",
  },
  {
    quote:
      "Fast, direct, and genuinely good taste. Creative Reason found problems in our onboarding we didn't know existed.",
    name: "Priya M.",
    role: "Head of Design",
  },
];
