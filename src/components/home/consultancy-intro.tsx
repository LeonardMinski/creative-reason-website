import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { TypewriterWord } from "@/components/typewriter-word";
import { capabilityGroups, consultancyMethod } from "@/lib/consultancy";

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
          {capabilityGroups.map((group) => (
            <li key={group.title} className="group relative">
              <button
                type="button"
                className="inline-block rounded-full border border-line-light px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink/60 transition-all duration-200 ease-out hover:scale-105 hover:border-signal hover:bg-signal/10 hover:text-signal focus-visible:scale-105 focus-visible:border-signal focus-visible:bg-signal/10 focus-visible:text-signal"
              >
                {group.title}
              </button>

              {/* Always present for assistive tech — visually hidden until
                  hover/focus, not conditionally rendered, so the full
                  breadth is available without relying on hover. */}
              <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-[min(16rem,calc(100vw-3rem))] rounded-lg border border-line-light/60 bg-paper p-4 opacity-0 shadow-lg transition-opacity duration-200 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                <ul className="flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="font-body text-xs leading-snug text-ink/65">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
