import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { Pill } from "@/components/pill";
import { TypewriterWord } from "@/components/typewriter-word";
import { consultancyCapabilities, consultancyMethod } from "@/lib/consultancy";

export function ConsultancyIntro() {
  return (
    <Section tone="paper" aria-labelledby="consultancy-heading">
      <SectionMeta index="04" label="Consultancy & Method" />
      <SpectrumRule className="mt-6 mb-10" />

      <Reveal>
        <h2
          id="consultancy-heading"
          className="max-w-3xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl"
        >
          Before we design, we find out <TypewriterWord word="why." />
        </h2>
        <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink/65 md:text-lg">
          Most design problems are symptoms of upstream decisions. We start by
          understanding the real problem — then design toward a solution that
          addresses it.
        </p>
      </Reveal>

      <ol className="mt-14 grid gap-x-10 gap-y-6 border-t border-line-light/60 pt-10 md:grid-cols-2">
        {consultancyMethod.map((stage, i) => (
          <Reveal as="li" key={stage.index} delayMs={i * 50} className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-signal">{stage.index}</span>
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-wide">
                {stage.label}
              </p>
              <p className="mt-1 font-body text-sm text-ink/60">{stage.detail}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-14 border-t border-line-light/60 pt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/50">
          Services &amp; capabilities index
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {consultancyCapabilities.map((capability) => (
            <Pill as="li" key={capability.title} title={capability.description}>
              {capability.title}
            </Pill>
          ))}
        </ul>
      </div>
    </Section>
  );
}
