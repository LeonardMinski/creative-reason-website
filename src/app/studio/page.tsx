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
  description: `${siteConfig.name} is the independent product studio of ${siteConfig.founder}, based in ${siteConfig.location}.`,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.founder,
  jobTitle: "Product Designer & Software Engineer",
  founderOf: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

const focusAreas = [
  "Design",
  "Engineering",
  "App Development",
  "Product Strategy",
  "Music",
  "Systems Thinking",
];

/** The founder's own brief, verbatim — see /studio. */
const bio = [
  "Leonard Minski is a multidisciplinary designer, engineer and product thinker working at the point where UX, technology and culture meet.",
  "His background is rooted in frontend engineering, where years spent translating complex requirements into clear, accessible digital experiences developed into something broader: an obsession with how products should work, how they should feel and why they should exist in the first place.",
  "That perspective now spans the full product journey — from discovery, UX strategy and interaction design through to design systems, production engineering and launch. Leonard is as comfortable interrogating a broken user journey as he is shaping an interface in Figma, architecting it in React or refining the final interaction in code.",
  "Music has always run alongside technology, giving his work a different creative rhythm. Sampling, production, visual culture and experimentation inform the way he approaches software: observe what exists, strip away the noise, find the underlying structure, then rebuild it with intention.",
  "That thinking led to Creative Reason — his independent product studio, built around the belief that good ideas need both imagination and discipline. It is also what led to products such as CRATE, created from a real frustration with the fragmented workflow of organising and preparing samples.",
  "Leonard’s strength is not fitting neatly into a single discipline. It is moving between them. UX gives him the questions. Design gives those answers form. Engineering makes them real.",
  "He works with organisations, products and ideas that need more than decoration — problems that need to be understood, systems that need to be simplified and experiences that deserve to be built properly.",
];

export default function StudioPage() {
  return (
    <Section tone="ink" className="min-h-[70vh]" aria-labelledby="studio-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SectionMeta index="00" label="About the Founder" tone="paper" />
      <SpectrumRule className="mt-6 mb-10" />

      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
        <Reveal className="relative aspect-4/5 w-full overflow-hidden lg:sticky lg:top-24">
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
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-signal">
              {siteConfig.founder} — Founder, {siteConfig.name}
            </p>
            <h1
              id="studio-heading"
              className="mt-4 font-display text-4xl font-black uppercase leading-[1.02] tracking-tight text-paper md:text-6xl"
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
            <div className="mt-8 flex max-w-xl flex-col gap-5">
              {bio.map((paragraph) => (
                <p key={paragraph} className="font-body text-base leading-relaxed text-paper/70 md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
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
