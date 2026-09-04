/** Approved consultancy capability copy, verbatim from the brief. */
export type Capability = {
  title: string;
  description: string;
};

export const consultancyCapabilities: Capability[] = [
  {
    title: "UX Audits",
    description: "Find usability, accessibility and interaction friction worth fixing.",
  },
  {
    title: "Product Discovery",
    description: "Understand the problem before committing to the solution.",
  },
  {
    title: "User Journeys",
    description: "Understand end-to-end behaviour and where experiences break down.",
  },
  {
    title: "UX Research",
    description: "Use evidence to understand user behaviour and needs.",
  },
  {
    title: "Accessibility",
    description: "Integrate WCAG-conscious thinking into design and implementation.",
  },
  {
    title: "Product Strategy",
    description: "Turn insight into prioritised product decisions.",
  },
  {
    title: "Prototyping",
    description: "Test ideas before expensive implementation.",
  },
  {
    title: "Design System Consultancy",
    description: "Improve consistency, accessibility and scalability.",
  },
];

export type ConsultancyStage = {
  index: string;
  label: string;
  detail: string;
};

/** The AMBIGUITY -> OBSERVE -> INSIGHT -> DECISION -> PRODUCT method, homepage-condensed form. */
export const consultancyMethod: ConsultancyStage[] = [
  { index: "01", label: "Ambiguity", detail: "The problem is not yet understood." },
  { index: "02", label: "Observation", detail: "We study what exists before proposing what should." },
  { index: "03", label: "Research", detail: "Evidence shapes direction." },
  { index: "04", label: "Insight", detail: "The structural issue becomes visible." },
  { index: "05", label: "Decision", detail: "Structure meets intention." },
  { index: "06", label: "Product", detail: "Ambiguity becomes product." },
];

export type CapabilityDomain = {
  title: string;
  description: string;
};

export const coreCapabilities: CapabilityDomain[] = [
  {
    title: "Strategy + UX",
    description:
      "From problem definition to design direction — product strategy, UX research and product discovery that make complex user journeys legible.",
  },
  {
    title: "Digital Products",
    description:
      "Interaction design and digital product design for web and native experiences, built to ship.",
  },
  {
    title: "Design Engineering",
    description:
      "The bridge between design intent and production code — frontend engineering that holds Figma-level fidelity and meets accessibility standards.",
  },
  {
    title: "Brand + Creative Technology",
    description:
      "Identity systems and creative technology work — unifying brand expression with interactive, experimental builds.",
  },
];
