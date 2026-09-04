import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { TypewriterWord } from "@/components/typewriter-word";
import { coreCapabilities } from "@/lib/consultancy";

export function Capabilities() {
  return (
    <Section tone="paper" aria-labelledby="capabilities-heading">
      <SectionMeta index="07" label="Four Core Capabilities" />
      <SpectrumRule className="mt-6 mb-10" />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <Reveal>
          <h2
            id="capabilities-heading"
            className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl"
          >
            Think.
            <br />
            Design.
            <br />
            <TypewriterWord word="Build." />
          </h2>
          <p className="mt-6 max-w-xs font-body text-sm text-ink/60">
            Our capabilities are structured to eliminate the traditional
            handoff friction between thinking, writing, and engineering.
          </p>
        </Reveal>

        <ol className="grid gap-8 border-t border-line-light/60 pt-8 sm:grid-cols-2">
          {coreCapabilities.map((capability, i) => (
            <Reveal as="li" key={capability.title} delayMs={i * 60}>
              <p className="font-mono text-xs text-signal">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold">
                {capability.title}
              </h3>
              <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-ink/60">
                {capability.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
