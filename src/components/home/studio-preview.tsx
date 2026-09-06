import Image from "next/image";
import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { duotoneStyle } from "@/components/duotone-defs";
import { Pill } from "@/components/pill";
import { TypewriterWord } from "@/components/typewriter-word";
import { CtaLink } from "@/components/cta-link";
import { siteConfig } from "@/lib/site-config";

const focusAreas = [
  "Design",
  "Engineering",
  "App Development",
  "Product Strategy",
  "Music",
  "Systems Thinking",
];

export function StudioPreview() {
  return (
    <Section tone="paper" aria-labelledby="studio-heading">
      <SectionMeta index="07" label="About the Founder" />
      <SpectrumRule className="mt-6 mb-10" />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
        <Reveal>
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-full ring-2 ring-signal/40 ring-offset-4 ring-offset-paper">
            <Image
              src="/studio/Leonard-minski.jpg"
              alt={siteConfig.founder}
              fill
              sizes="(min-width: 1024px) 320px, 60vw"
              className="object-cover object-top"
              style={duotoneStyle}
            />
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <h2
            id="studio-heading"
            className="font-display text-3xl font-black uppercase leading-[1.05] tracking-tight md:text-5xl"
          >
            Designer. Engineer.
            <br />
            Problem <TypewriterWord word="solver." />
          </h2>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink/70 md:text-lg">
            {siteConfig.name} is the independent product studio of {siteConfig.founder}.
            I&rsquo;m a product-focused designer and software engineer working
            across product thinking, UX and engineering — combined with music
            and systems thinking to investigate problems properly, design
            deliberately, and build products through to working software.
            Based in {siteConfig.location}.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <Pill as="li" key={area}>
                {area}
              </Pill>
            ))}
          </ul>
          <CtaLink href="/studio" className="mt-8">
            About the founder
          </CtaLink>
        </Reveal>
      </div>
    </Section>
  );
}
