import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { TypewriterWord } from "@/components/typewriter-word";

const pillars = [
  {
    index: "01",
    title: "Strategy & UX",
    body: "We isolate systemic product tension and frame problems into cross-cutting hypotheses, high-fidelity pathways for complex systems.",
  },
  {
    index: "02",
    title: "Design",
    body: "Authoritative motion systems, gorgeous design surfaces with strict typographic rules and clean, sharp interfaces.",
  },
  {
    index: "03",
    title: "Engineering",
    body: "Writing low-latency React and native code that respects the absolute visual fidelity of the design intent.",
  },
];

export function Positioning() {
  return (
    <Section tone="paper" aria-labelledby="positioning-heading">
      <SectionMeta index="02" label="Studio Positioning" />
      <SpectrumRule className="mt-6 mb-10" />
      <Reveal>
        <h2
          id="positioning-heading"
          className="max-w-4xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl"
        >
          From problem definition to shipped <TypewriterWord word="product." />
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.index} delayMs={i * 80}>
            <p className="font-mono text-xs text-signal">{pillar.index}</p>
            <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-tight">
              {pillar.title}
            </h3>
            <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-ink/65">
              {pillar.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
