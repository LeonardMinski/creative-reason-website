/**
 * Selected-work / product catalogue data.
 *
 * CRATE's case study is the founder's own first-person write-up (provided
 * directly), not inferred copy — screenshots are sourced from the real
 * product repository (sibling directory `crate/`, `docs/assets/screenshots/`).
 * `launchUrl` stays omitted until a confirmed production URL exists — the UI
 * shows a "coming soon" state rather than a guessed link.
 *
 * ShiftFlow's and Station Ten's case studies are likewise the founder's own
 * first-person write-ups (provided directly) — screenshots are one real
 * product screenshot each (provided directly, not sourced from their repos).
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
    tagline: "Employee scheduling without spreadsheet chaos.",
    tags: ["Product UX", "Engineering"],
    screenshots: [
      { src: "/work/shiftflow/home.png", alt: "ShiftFlow — the Rota view, showing staff and shifts across a week", width: 2220, height: 1135 },
    ],
    caseStudy: {
      summary: "Employee scheduling without spreadsheet chaos.",
      intro: [
        "ShiftFlow is a full-stack employee scheduling application designed to help small businesses manage staff, availability and weekly rotas in one place.",
        "I built it as a serious learning project to move beyond simple CRUD and work through the kind of problems that show up in real products: authentication, roles, permissions, scheduling rules, publishing workflows, responsive UX and testing.",
      ],
      sections: [
        {
          heading: "The challenge",
          blocks: [
            {
              kind: "paragraph",
              text: "Creating a rota looks simple until you start modelling what actually needs to happen.",
            },
            {
              kind: "paragraph",
              text: "Managers need to know who is available, whether a shift conflicts with another, whether somebody can legally be assigned to that time, and whether the rota is still being prepared or has been published.",
            },
            { kind: "paragraph", text: "Employees need something much simpler:" },
            {
              kind: "emphasis",
              lines: ["When am I working, and when have I said I’m available?"],
            },
            {
              kind: "paragraph",
              text: "The goal was to create one system that handles both experiences without turning the product into a bloated admin dashboard.",
            },
          ],
        },
        {
          heading: "The approach",
          blocks: [
            { kind: "paragraph", text: "I designed ShiftFlow around two clear journeys." },
            { kind: "paragraph", text: "Managers can:" },
            {
              kind: "paragraph",
              text: "Manage employees, review availability, create and assign shifts, catch scheduling conflicts and publish a weekly rota.",
            },
            { kind: "paragraph", text: "Employees can:" },
            {
              kind: "paragraph",
              text: "View their own published schedule and update their recurring availability through a much simpler self-service experience.",
            },
            {
              kind: "paragraph",
              text: "The weekly rota became the centre of the manager product rather than hiding scheduling behind multiple separate screens.",
            },
          ],
        },
        {
          heading: "Scheduling that understands availability",
          blocks: [
            { kind: "paragraph", text: "Availability is not just profile information in ShiftFlow." },
            {
              kind: "paragraph",
              text: "When a manager creates a shift, the application checks whether the employee is available for that day and whether the shift falls inside their available hours.",
            },
            {
              kind: "paragraph",
              text: "It also checks for existing shift conflicts before allowing the assignment.",
            },
            {
              kind: "paragraph",
              text: "That turns the rota from a visual calendar into something that actively helps prevent scheduling mistakes.",
            },
          ],
        },
        {
          heading: "Authentication and real authorization",
          blocks: [
            {
              kind: "paragraph",
              text: "ShiftFlow uses Clerk for authentication, but authentication alone was not enough.",
            },
            {
              kind: "paragraph",
              text: "I introduced a separate ShiftFlow user model with MANAGER and EMPLOYEE roles and enforced permissions on the GraphQL API rather than relying on hidden buttons in the frontend.",
            },
            { kind: "paragraph", text: "Managers can administer the rota and employees." },
            { kind: "paragraph", text: "Employees can only access their own schedule and availability." },
            {
              kind: "paragraph",
              text: "That means an employee cannot simply modify a request and access somebody else's data.",
            },
          ],
        },
        {
          heading: "Publishing the rota",
          blocks: [
            { kind: "paragraph", text: "The original interface showed a Draft badge, but it was only visual." },
            { kind: "paragraph", text: "I replaced that with a real persisted publishing workflow." },
            {
              kind: "paragraph",
              text: "Managers prepare a weekly rota, publish it, and employees only see shifts belonging to published weeks.",
            },
            {
              kind: "paragraph",
              text: "Publication is modelled per week rather than attached independently to every shift, keeping the data model closer to how the product actually works.",
            },
          ],
        },
        {
          heading: "Designing the experience",
          blocks: [
            { kind: "paragraph", text: "The visual direction is intentionally restrained." },
            {
              kind: "paragraph",
              text: "I wanted ShiftFlow to feel like operational software rather than another generic SaaS dashboard.",
            },
            { kind: "paragraph", text: "The interface uses:" },
            {
              kind: "list",
              items: [
                "compact information-dense layouts",
                "restrained purple accents",
                "clear role-based navigation",
                "contextual shift editing",
                "simple availability states",
                "a focused employee schedule",
                "accessible loading, error and validation feedback",
              ],
            },
            {
              kind: "paragraph",
              text: "Creating or editing a shift happens alongside the rota so the manager keeps the scheduling context while making changes.",
            },
          ],
        },
        {
          heading: "A bug worth finding",
          blocks: [
            { kind: "paragraph", text: "One of the more interesting issues appeared around publishing weeks." },
            {
              kind: "paragraph",
              text: "Using toISOString() for week-start dates caused local calendar dates to shift when converted to UTC, which meant a published rota could incorrectly appear unpublished to an employee.",
            },
            {
              kind: "paragraph",
              text: "I introduced a consistent week-start key so the frontend and backend agree on the same calendar week regardless of timezone conversion.",
            },
            {
              kind: "paragraph",
              text: "It was a small bug with a big lesson: dates are part of the domain, not just formatting.",
            },
          ],
        },
        {
          heading: "Testing the behaviour that matters",
          blocks: [
            {
              kind: "paragraph",
              text: "I separated business rules into pure functions wherever possible and added tests around:",
            },
            {
              kind: "list",
              items: [
                "week calculations",
                "availability rules",
                "role-based navigation",
                "employee self-service",
                "publication behaviour",
                "form validation",
                "scheduling logic",
              ],
            },
            {
              kind: "paragraph",
              text: "I also manually verified real authorization boundaries using actual Clerk sessions and direct GraphQL requests.",
            },
          ],
        },
        {
          heading: "What I learned",
          blocks: [
            {
              kind: "paragraph",
              text: "The most valuable part of ShiftFlow was seeing how one feature affects the rest of the system.",
            },
            {
              kind: "emphasis",
              lines: [
                "Availability changed scheduling.",
                "Authentication introduced identity.",
                "Roles introduced authorization.",
                "Publishing changed the data model.",
                "Employee self-service changed what the API was allowed to expose.",
              ],
            },
            { kind: "paragraph", text: "The project helped shift my thinking from:" },
            {
              kind: "emphasis",
              lines: [
                "“What component or hook do I need?”",
                "to:",
                "“What problem am I modelling, where should that responsibility live, and what should the system guarantee?”",
              ],
            },
          ],
        },
        {
          heading: "Outcome",
          blocks: [
            { kind: "paragraph", text: "ShiftFlow now supports the full core scheduling loop:" },
            {
              kind: "definitions",
              items: [
                {
                  term: "Manager",
                  description:
                    "Manage employees → understand availability → build rota → validate assignments → publish week",
                },
                {
                  term: "Employee",
                  description: "Sign in → view published shifts → manage own availability",
                },
              ],
            },
            {
              kind: "paragraph",
              text: "I deliberately kept features such as shift swaps, leave management, realtime collaboration and AI rota generation outside the MVP.",
            },
            { kind: "paragraph", text: "The aim was not to build the biggest scheduling platform possible." },
            {
              kind: "paragraph",
              text: "It was to build a focused product properly and use it to strengthen my frontend, full-stack and product-engineering skills",
            },
          ],
        },
      ],
      stack: ["Next.js", "React", "TypeScript", "GraphQL", "Apollo", "Prisma", "PostgreSQL", "Clerk"],
    },
  },
  {
    slug: "station-ten",
    code: "CR / C01",
    kind: "consultancy",
    title: "Station Ten",
    category: "Consultancy · UX Design · WordPress Development",
    tagline: "Giving a hidden local venue the digital presence it deserves.",
    tags: ["UX Design", "WordPress Development", "SEO"],
    screenshots: [
      { src: "/work/station-ten/home.png", alt: "Station Ten — homepage hero and upcoming events listing", width: 2040, height: 1291 },
    ],
    caseStudy: {
      summary: "Giving a hidden local venue the digital presence it deserves.",
      intro: [
        "Station TEN is an independent bar, live music and events venue that I discovered almost by accident.",
        "I was looking for somewhere local to meet my partner and came across the venue, but there was no dedicated website to properly understand what it offered. Visiting felt like a small leap of faith.",
        "What I found was a hidden gem: a great physical experience that simply wasn't being represented online.",
        "A chance conversation with the owner turned that observation into a real product opportunity.",
      ],
      sections: [
        {
          heading: "The challenge",
          blocks: [
            {
              kind: "paragraph",
              text: "For a local venue, the website often starts working before a customer ever walks through the door.",
            },
            { kind: "paragraph", text: "People want to know:" },
            {
              kind: "paragraph",
              text: "What's on? What does the place look like? What can I eat or drink? Where is it? When is it open? Can I book it?",
            },
            {
              kind: "paragraph",
              text: "Without a dedicated website, that information can become fragmented across Google, Instagram, Eventbrite and other platforms.",
            },
            {
              kind: "paragraph",
              text: "The challenge was to create a central digital home for Station TEN that reflected the venue itself while making those important customer journeys much easier.",
            },
            {
              kind: "paragraph",
              text: "It also needed to be realistic for a small independent business to operate.",
            },
          ],
        },
        {
          heading: "The approach",
          blocks: [
            { kind: "paragraph", text: "I started with discovery rather than immediately building a website." },
            {
              kind: "paragraph",
              text: "I looked at the venue from the perspective of a first-time customer, researched comparable hospitality and events businesses, identified the information customers would need and mapped the key journeys.",
            },
            {
              kind: "paragraph",
              text: "The experience was then designed mobile-first because discovery of local venues frequently happens while people are already using their phones.",
            },
            { kind: "paragraph", text: "The core experience brings together:" },
            {
              kind: "list",
              items: [
                "upcoming and past events",
                "food and drinks",
                "opening times and location",
                "private hire",
                "event enquiries",
                "co-working",
                "booking journeys",
                "contact and social information",
              ],
            },
            {
              kind: "paragraph",
              text: "I developed the initial experience in Figma before moving into a working WordPress implementation.",
            },
          ],
        },
        {
          heading: "Designing around customer intent",
          blocks: [
            {
              kind: "paragraph",
              text: "The site isn't organised around what pages a business traditionally thinks it needs.",
            },
            { kind: "paragraph", text: "It's organised around what a potential customer is trying to accomplish." },
            {
              kind: "paragraph",
              text: "Someone discovering Station TEN should quickly be able to understand what kind of venue it is, see what's happening there and decide whether they want to visit.",
            },
            {
              kind: "paragraph",
              text: "Someone already interested in the venue needs a much shorter path to events, menus, directions or making an enquiry.",
            },
            {
              kind: "paragraph",
              text: "And someone planning a birthday, private function or event needs to immediately understand that the venue can be hired and how to start that conversation.",
            },
            {
              kind: "paragraph",
              text: "That thinking shaped the information architecture and calls to action throughout the site.",
            },
          ],
        },
        {
          heading: "Building something the business can actually manage",
          blocks: [
            {
              kind: "paragraph",
              text: "A good small-business website shouldn't require a developer every time an event changes.",
            },
            { kind: "paragraph", text: "That's one of the reasons I chose WordPress." },
            {
              kind: "paragraph",
              text: "The implementation gives the business a familiar content-management system while allowing the customer-facing experience to be designed specifically around the venue.",
            },
            {
              kind: "paragraph",
              text: "Content such as events, menus and general venue information can be maintained without changing the underlying site.",
            },
            {
              kind: "paragraph",
              text: "For the initial version, existing services such as Eventbrite can continue handling ticketing while enquiries are routed directly to the business.",
            },
            {
              kind: "paragraph",
              text: "This keeps the first release practical without preventing more sophisticated functionality later.",
            },
          ],
        },
        {
          heading: "SEO from the foundation",
          blocks: [
            {
              kind: "paragraph",
              text: "Discoverability was one of the core problems the project was intended to solve, so SEO couldn't simply be something added after development.",
            },
            { kind: "paragraph", text: "I structured the site with search engines as well as customers in mind." },
            { kind: "paragraph", text: "That includes:" },
            {
              kind: "list",
              items: [
                "semantic page and heading structure",
                "descriptive page titles and metadata",
                "crawlable website content",
                "location-focused information",
                "dedicated event and service content",
                "mobile responsiveness",
                "performance considerations",
                "accessible markup and navigation",
                "clear internal linking",
                "foundations for local search optimisation",
              ],
            },
            { kind: "paragraph", text: "The objective isn't to make unrealistic promises about Google rankings." },
            {
              kind: "paragraph",
              text: "It's to give the business a technically sound, search-friendly foundation from which its visibility can grow.",
            },
          ],
        },
        {
          heading: "Designed to grow with the venue",
          blocks: [
            {
              kind: "paragraph",
              text: "I deliberately avoided turning the first release into an expensive custom platform.",
            },
            {
              kind: "paragraph",
              text: "The architecture allows the business to start with the functionality it actually needs and progressively bring more of its customer journey in-house.",
            },
            { kind: "paragraph", text: "A future phase could introduce:" },
            {
              kind: "flow",
              steps: [
                "Direct bookings",
                "online payments",
                "customer accounts",
                "memberships",
                "member discounts",
                "priority event access",
                "booking management",
              ],
            },
            {
              kind: "paragraph",
              text: "That creates a progression from a marketing website into a broader digital platform without requiring the business to fund or manage all of that complexity on day one.",
            },
          ],
        },
        {
          heading: "From design to launch",
          blocks: [
            { kind: "paragraph", text: "The project covers more than producing screens." },
            {
              kind: "paragraph",
              text: "The process considers what is required to take a small business from an inconsistent online presence to a functioning website:",
            },
            {
              kind: "flow",
              steps: [
                "Discovery",
                "Competitor Research",
                "Customer Journeys",
                "Information Architecture",
                "Wireframing",
                "Mobile-First UI",
                "WordPress Development",
                "Content Structure",
                "Booking & Enquiry Setup",
                "SEO Foundations",
                "Responsive Testing",
                "Launch Readiness",
              ],
            },
            {
              kind: "paragraph",
              text: "It means design, development and the commercial reality of running the website are considered together rather than as separate exercises.",
            },
          ],
        },
        {
          heading: "What I learned",
          blocks: [
            {
              kind: "paragraph",
              text: "Station TEN reinforced how valuable it is to experience a problem from the customer's side before trying to solve it.",
            },
            { kind: "paragraph", text: "I didn't discover the venue because somebody handed me a design brief." },
            { kind: "paragraph", text: "I was the potential customer struggling to understand the business online." },
            { kind: "paragraph", text: "That made the central problem unusually clear:" },
            {
              kind: "emphasis",
              lines: ["The quality of the digital experience wasn't matching the quality of the real-world experience."],
            },
            {
              kind: "paragraph",
              text: "It also strengthened my understanding of designing for two users at once: the customer who needs an effortless experience and the small-business owner who needs something practical to maintain.",
            },
          ],
        },
        {
          heading: "Outcome",
          blocks: [
            {
              kind: "paragraph",
              text: "Station TEN evolved from a chance discovery into an end-to-end hospitality website project covering product thinking, UX, design, development and SEO.",
            },
            {
              kind: "paragraph",
              text: "The resulting approach provides a repeatable foundation for independent bars, restaurants, cafés, event spaces and other hospitality businesses facing the same problem:",
            },
            {
              kind: "emphasis",
              lines: ["A great business shouldn't remain a hidden gem because its digital presence makes it difficult to discover."],
            },
          ],
        },
      ],
      stack: ["WordPress", "PHP", "HTML", "CSS", "JavaScript", "Figma", "UX Design", "Responsive Design", "SEO"],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Own products that are genuinely in early development — no build to show
 * yet, so these are name + one-liner only, clearly marked "Under
 * construction", shown only on `/products`. Deliberately excluded from the
 * homepage — unbuilt side-projects shouldn't share a section with proven,
 * shipped evidence like CRATE. Not part of `projects`: no case study route,
 * no catalogue entry — a shipped build is what earns those.
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
