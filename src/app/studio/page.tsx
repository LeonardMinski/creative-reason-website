import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { duotoneStyle } from "@/components/duotone-defs";
import { Pill } from "@/components/pill";
import { TypewriterWord } from "@/components/typewriter-word";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About the Founder",
  description: `${siteConfig.name} is the practice of ${siteConfig.founder} — an independent UX, design and technology studio based in ${siteConfig.location}.`,
};

const focusAreas = [
  "Design",
  "Engineering",
  "App Development",
  "Product Strategy",
  "Music",
  "Systems Thinking",
];

export default function StudioPage() {
  return (
    <Section tone="ink" className="min-h-[70vh]" aria-labelledby="studio-heading">
      <SectionMeta index="00" label="About the Founder" tone="paper" />
      <SpectrumRule className="mt-6 mb-10" />

      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
        <Reveal className="relative aspect-4/5 w-full overflow-hidden">
          <Image
            src="/studio/Leonard-minski.jpg"
            alt={siteConfig.founder}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-top"
            style={duotoneStyle}
            priority
          />
          {/* Fades the portrait into the ink background at its base — the
              duotone's shadow tones are already ink, so this reads as one surface. */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink to-transparent" />
        </Reveal>

        <div>
          <Reveal>
            <h1
              id="studio-heading"
              className="font-display text-4xl font-black uppercase leading-[1.02] tracking-tight text-paper md:text-6xl"
            >
              Designer. Engineer.
              <br />
              Problem solver.
              <br />
              <span className="spectrum-text">
                <TypewriterWord word="Producer." />
              </span>
            </h1>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-paper/70 md:text-lg">
              {siteConfig.name} is the independent practice of {siteConfig.founder} —
              combining UX, design, engineering, music and systems thinking to
              understand problems, shape better ideas and build useful
              things. Based in {siteConfig.location}.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <Pill as="li" tone="dark" key={area}>
                  {area}
                </Pill>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
