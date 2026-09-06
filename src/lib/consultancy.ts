export type ConsultancyStage = {
  index: string;
  label: string;
  detail: string;
};

/** The AMBIGUITY -> OBSERVE -> INSIGHT -> DECISION -> PRODUCT method, homepage-condensed form. */
export const consultancyMethod: ConsultancyStage[] = [
  { index: "01", label: "Ambiguity", detail: "The problem is not yet understood." },
  { index: "02", label: "Observation", detail: "What exists gets studied before what should." },
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
    // First four are the strongest, shown by default — see the Capabilities section.
    items: [
      "Product discovery",
      "UX research",
      "Product strategy",
      "Prototyping",
      "UX audits",
      "User journeys",
      "Information architecture",
      "Usability testing",
      "Prioritisation",
      "Analytics-informed optimisation",
    ],
  },
  {
    title: "Design Systems & Accessibility",
    items: [
      "Design systems",
      "Accessibility audits",
      "Component architecture",
      "WCAG compliance",
      "Design tokens",
      "Accessible interaction patterns",
      "Responsive systems",
      "Figma-to-code alignment",
      "Design system governance",
    ],
  },
  {
    title: "Design Engineering",
    items: [
      "Production prototyping",
      "React",
      "TypeScript",
      "Motion and micro-interactions",
      "Interaction design",
      "Next.js",
      "Responsive UI engineering",
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
      "Application architecture",
      "Testing and QA",
      "API integration",
      "GraphQL integration",
      "State and data flows",
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
      "Rapid product experiments",
      "Conversational interfaces",
      "AI feature integration",
      "Human-in-the-loop UX",
      "Design-to-code workflows",
      "AI-assisted development workflows",
    ],
  },
  {
    title: "Brand & Creative Technology",
    items: [
      "Digital identity",
      "Brand systems",
      "Interactive experiences",
      "Creative technology",
      "Typography",
      "Digital brand expression",
      "Creative development",
      "Audio-led experiences",
      "Experimental interfaces",
    ],
  },
];
