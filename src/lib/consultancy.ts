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

export type CapabilityGroup = {
  title: string;
  items: string[];
};

/**
 * The homepage's one, definitive capability taxonomy — six domains, each a
 * heading with its constituent skills/services. Rendered as a hover/focus
 * disclosure (see the Capabilities section) rather than a flat pill list,
 * so the full breadth is available without dominating the section visually.
 */
export const capabilityGroups: CapabilityGroup[] = [
  {
    title: "Product Strategy & UX",
    items: [
      "Product discovery",
      "UX audits",
      "UX research",
      "User journeys",
      "Information architecture",
      "Usability testing",
      "Product strategy",
      "Prioritisation",
      "Prototyping",
      "Analytics-informed optimisation",
    ],
  },
  {
    title: "Design Systems & Accessibility",
    items: [
      "Design systems",
      "Component architecture",
      "Design tokens",
      "Accessible interaction patterns",
      "Accessibility audits",
      "WCAG compliance",
      "Responsive systems",
      "Figma-to-code alignment",
      "Design system governance",
    ],
  },
  {
    title: "Design Engineering",
    items: [
      "Interaction design",
      "Production prototyping",
      "React",
      "Next.js",
      "TypeScript",
      "Responsive UI engineering",
      "Motion and micro-interactions",
      "Frontend architecture",
      "Performance optimisation",
      "Interface polish",
    ],
  },
  {
    title: "Digital Product Engineering",
    items: [
      "Web applications",
      "Frontend development",
      "API integration",
      "GraphQL integration",
      "Application architecture",
      "State and data flows",
      "Testing and QA",
      "Performance",
      "SEO",
      "Production readiness",
    ],
  },
  {
    title: "AI Product & Rapid Prototyping",
    items: [
      "AI-assisted product prototyping",
      "AI-enabled interfaces",
      "Agent UX",
      "Conversational interfaces",
      "AI feature integration",
      "Human-in-the-loop UX",
      "Design-to-code workflows",
      "Rapid product experiments",
      "AI-assisted development workflows",
    ],
  },
  {
    title: "Brand & Creative Technology",
    items: [
      "Digital identity",
      "Brand systems",
      "Typography",
      "Digital brand expression",
      "Interactive experiences",
      "Creative development",
      "Audio-led experiences",
      "Creative technology",
      "Experimental interfaces",
    ],
  },
];
