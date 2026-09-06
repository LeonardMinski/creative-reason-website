import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { Pill } from "@/components/pill";
import { TypewriterWord } from "@/components/typewriter-word";
import { CtaLink } from "@/components/cta-link";

const representativeCapabilities = ["UX Audits", "Product Discovery", "Product Strategy"];

/** A teaser only — the full proposition, service list and process live on /consultancy. */
export function ConsultancyIntro() {
  return (
    <Section tone="paper" aria-labelledby="consultancy-heading">
      <SectionMeta index="03" label="Consultancy" />
      <SpectrumRule className="mt-6 mb-10" />

      <Reveal>
        <h2
          id="consultancy-heading"
          className="max-w-3xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl"
        >
          Before designing, find out <TypewriterWord word="why." />
        </h2>
        <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink/65 md:text-lg">
          Products rarely fail because they need prettier screens. Creative
          Reason helps uncover the friction, assumptions and structural
          decisions underneath the interface — then turns that understanding
          into a clearer product direction.
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {representativeCapabilities.map((capability) => (
            <Pill as="li" key={capability}>
              {capability}
            </Pill>
          ))}
        </ul>

        <CtaLink href="/consultancy" className="mt-8">
          Explore consultancy
        </CtaLink>
      </Reveal>
    </Section>
  );
}
