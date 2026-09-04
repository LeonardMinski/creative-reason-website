/**
 * Selected-work / product catalogue data.
 *
 * CRATE's case study is the founder's own first-person write-up (provided
 * directly), not inferred copy — screenshots are sourced from the real
 * product repository (sibling directory `crate/`, `docs/assets/screenshots/`).
 * `launchUrl` stays omitted until a confirmed production URL exists — the UI
 * shows a "coming soon" state rather than a guessed link.
 *
 * ShiftFlow (employee scheduling, Next.js + GraphQL) and Station Ten (a
 * custom WordPress theme for a live venue) are similarly grounded in their
 * own repositories' README content, and now each have one real product
 * screenshot (provided directly, not sourced from their repos). Neither has
 * a full written case-study narrative yet, so `caseStudy` stays omitted for
 * both — see brief: "never invent missing outcomes."
 *
 * No dates are published until a specific public date is approved (per
 * brief: "omit the year" rather than reuse placeholder 2024 metadata).
 *
 * The Lab section/route was removed entirely at the site owner's direction —
 * it represented experiments that were never actually built, not real work.
 */

export type CaseStudyBlock =
  | { kind: "paragraph"; text: string }
  /** A short, pulled-out emphasis statement (e.g. a one-line reframe). */
  | { kind: "emphasis"; lines: string[] }
  /** A short linear process, rendered as STEP → STEP → STEP. */
  | { kind: "flow"; steps: string[] }
  /** Named decisions/principles, each with a one-line rationale. */
  | { kind: "definitions"; items: { term: string; description: string }[] }
  | { kind: "list"; items: string[] };

export type CaseStudySection = {
  heading: string;
  blocks: CaseStudyBlock[];
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  /** Real pixel dimensions — screenshots arrive at whatever size they were captured, so the case-study gallery renders each at its own aspect ratio instead of cropping to a fixed one. */
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  code: string;
  /** Derived from the code prefix per the approved catalogue codes (SECTION I). */
  kind: "product" | "consultancy";
  title: string;
  category: string;
  tagline: string;
  tags: string[];
  /** Real product screenshots, when available — see crate below. */
  screenshots?: ProjectScreenshot[];
  /** Present only when narrative content has been approved for a full case study. */
  caseStudy?: {
    summary: string;
    /** Opening paragraphs shown directly under the hero, before the numbered sections. */
    intro?: string[];
    sections: CaseStudySection[];
    stack?: string[];
    /** Real production URL — omit rather than guess; the UI shows a "coming soon" state without it. */
    launchUrl?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "crate",
    code: "CR / 001",
    kind: "product",
    title: "Crate",
    category: "Product · UX Design · Engineering",
    tagline:
      "A local-first workspace for turning messy sample libraries into production-ready material.",
    tags: ["Product Design", "Design Engineering", "Frontend Engineering", "Audio UX"],
    screenshots: [
      { src: "/work/crate/home.png", alt: "Crate home screen — crate list and workspace overview", width: 1440, height: 900 },
      { src: "/work/crate/triage.png", alt: "Crate Triage — classification complete summary", width: 1440, height: 900 },
      { src: "/work/crate/export.png", alt: "Crate Export — selected assets ready to render", width: 1440, height: 900 },
    ],
    caseStudy: {
      summary:
        "A local-first workspace for turning messy sample libraries into production-ready material.",
      // launchUrl intentionally omitted — no confirmed production URL yet.
      intro: [
        "CRATE started from a simple frustration: I had large sample folders full of useful sounds, but organising and preparing them was slow enough that I often avoided the process entirely.",
        "I wanted one focused workflow that could take a producer from raw folder → curated material → usable chops and loops without bouncing between Finder, preview tools and a DAW.",
      ],
      sections: [
        {
          heading: "The problem",
          blocks: [
            {
              kind: "paragraph",
              text: "Sample collections become chaotic quickly.",
            },
            {
              kind: "paragraph",
              text: "A producer might have hundreds or thousands of loops, drums, vocals and textures, but working through them usually means repeatedly previewing files, moving them manually, opening a DAW to inspect waveforms and then exporting anything useful.",
            },
            {
              kind: "emphasis",
              lines: ["The problem was not a lack of tools.", "It was the fragmented workflow between them."],
            },
          ],
        },
        {
          heading: "The solution",
          blocks: [
            { kind: "paragraph", text: "I designed CRATE around one clear journey:" },
            { kind: "flow", steps: ["Triage", "Chop", "Loop", "Export"] },
            {
              kind: "paragraph",
              text: "In Triage, producers rapidly audition sounds and classify them as Keep, Maybe or Trash.",
            },
            {
              kind: "paragraph",
              text: "When CRATE is given explicit access to a sample folder, it can safely reorganise those original files into matching folders without permanently deleting anything.",
            },
            {
              kind: "paragraph",
              text: "Interesting moments can become QuickLoops, which carry through to dedicated Loop and Chop workspaces for refinement, processing and export.",
            },
            {
              kind: "paragraph",
              text: "The result is deliberately narrower than a DAW: CRATE focuses on making decisions about the samples you already own.",
            },
          ],
        },
        {
          heading: "Key product decisions",
          blocks: [
            {
              kind: "definitions",
              items: [
                {
                  term: "Local-first by design",
                  description:
                    "Audio, project state and processing stay on the user's device. CRATE requires no account, cloud storage or backend.",
                },
                {
                  term: "Temporary ≠ permanent",
                  description:
                    "Dragging across a waveform creates a temporary Selection. A Chop only becomes permanent after the user explicitly creates it.",
                },
                {
                  term: "Loop ≠ Chop",
                  description:
                    "Opening a saved Loop in Chop transfers its boundaries as a temporary selection rather than silently duplicating assets.",
                },
                {
                  term: "Safe filesystem access",
                  description:
                    "Normal file import is read-only. Physical sample organisation only happens after the user explicitly grants managed-folder access.",
                },
              ],
            },
          ],
        },
        {
          heading: "Engineering challenges",
          blocks: [
            {
              kind: "paragraph",
              text: "The most interesting work sat at the boundary between product behaviour and browser systems.",
            },
            { kind: "paragraph", text: "I had to solve problems including:" },
            {
              kind: "list",
              items: [
                "reliable browser audio lifecycle management",
                "realtime and exported FX consistency",
                "IndexedDB persistence for audio-heavy projects",
                "safe filesystem moves with verification and failure handling",
                "large-folder scanning without overwhelming the browser",
                "portable .crate projects without leaking filesystem permissions",
                "persistence races during immediate reload/close",
                "production CSP and security hardening",
              ],
            },
            {
              kind: "paragraph",
              text: "One example came late in the release process: an immediate reload could occur before the normal autosave debounce completed. Rather than simply shortening the delay, I added lifecycle-aware persistence so pending canonical state is flushed when the page is leaving.",
            },
          ],
        },
        {
          heading: "Outcome",
          blocks: [
            {
              kind: "paragraph",
              text: "CRATE shipped as v1.0.0 and became the first released product from Creative Reason.",
            },
            { kind: "paragraph", text: "The final Web MVP includes:" },
            {
              kind: "list",
              items: [
                "rapid Keep / Maybe / Trash triage",
                "managed sample-folder organisation",
                "waveform-based Chop and Loop workflows",
                "BPM, key and transient analysis",
                "pitch, EQ, filtering, Drive, Vinyl and Character processing",
                "local persistence and portable .crate projects",
                "batch rendering and ZIP export",
                "responsive layouts and production security hardening",
              ],
            },
            {
              kind: "paragraph",
              text: "The release passed 197 unit tests, 74 end-to-end tests, production security validation and real-browser acceptance.",
            },
          ],
        },
        {
          heading: "My role",
          blocks: [
            { kind: "paragraph", text: "I led the project across the full product loop:" },
            {
              kind: "flow",
              steps: [
                "Problem definition",
                "UX",
                "Interaction model",
                "Visual design",
                "Architecture",
                "Implementation direction",
                "Testing",
                "Release",
              ],
            },
            {
              kind: "paragraph",
              text: "CRATE is the kind of work I want to keep doing: identifying friction, designing a clearer system, and engineering the experience all the way through to a shipped product.",
            },
          ],
        },
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind",
        "Web Audio API",
        "WaveSurfer",
        "IndexedDB",
        "File System Access API",
        "Meyda",
        "Playwright",
      ],
    },
  },
  {
    slug: "shiftflow",
    code: "CR / 002",
    kind: "product",
    title: "ShiftFlow",
    category: "Product · UX Design · Engineering",
    tagline: "Employee scheduling software — a Next.js web app backed by a GraphQL API.",
    tags: ["Product UX", "Engineering"],
    screenshots: [
      { src: "/work/shiftflow/home.png", alt: "ShiftFlow — the Rota view, showing staff and shifts across a week", width: 2220, height: 1135 },
    ],
  },
  {
    slug: "station-ten",
    code: "CR / C01",
    kind: "consultancy",
    title: "Station Ten",
    category: "Digital Experience · UX, Brand",
    tagline: "A custom WordPress theme and digital experience for a live venue — events, booking and menu.",
    tags: ["UX", "Brand"],
    screenshots: [
      { src: "/work/station-ten/home.png", alt: "Station Ten — homepage hero and upcoming events listing", width: 2040, height: 1291 },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Own products that are genuinely in early development — no build to show
 * yet, so these are name + one-liner only, clearly marked, on `/products`.
 * Not part of `projects`: no case study route, no Selected Work listing.
 */
export type InDevelopmentProduct = {
  slug: string;
  title: string;
  tagline: string;
};

export const inDevelopmentProducts: InDevelopmentProduct[] = [
  {
    slug: "barterbase",
    title: "Barterbase",
    tagline: "A marketplace for bartering goods and services.",
  },
  {
    slug: "shesync-plus",
    title: "SheSync+",
    tagline: "A cycle-powered wellbeing, connection and intimacy app.",
  },
  {
    slug: "preferences",
    title: "Preferences",
    tagline: "A dating app built around compatibility, not swiping.",
  },
];
