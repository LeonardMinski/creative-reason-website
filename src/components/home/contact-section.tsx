import { SectionMeta } from "@/components/section-meta";
import { Reveal } from "@/components/reveal";
import { Pill } from "@/components/pill";
import { TypewriterWord } from "@/components/typewriter-word";
import { siteConfig } from "@/lib/site-config";

const engagementTypes = [
  "UX Consultancy",
  "Product Design",
  "Design Engineering",
  "Digital Experience",
  "Collaboration",
];

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-line bg-ink text-paper"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <SectionMeta index="12" label="Get In Touch" tone="paper" />

        <Reveal>
          <h2
            id="contact-heading"
            className="mt-8 max-w-3xl font-display text-5xl font-black uppercase leading-[0.98] tracking-tight md:text-7xl"
          >
            Have a problem worth <TypewriterWord word="solving?" />
          </h2>
        </Reveal>

        <Reveal delayMs={80}>
          <ul className="mt-8 flex flex-wrap gap-2">
            {engagementTypes.map((type) => (
              <Pill as="li" tone="dark" key={type}>
                {type}
              </Pill>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={140}>
          <div className="mt-12 flex flex-col gap-4 border-t border-paper/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-display text-2xl font-medium underline decoration-signal underline-offset-8 transition-opacity hover:opacity-70 md:text-3xl"
            >
              {siteConfig.contactEmail}
            </a>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
              {siteConfig.location}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
