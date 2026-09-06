import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { Reveal } from "@/components/reveal";

const steps = ["Observe", "Reason", "Create", "Ship"];

export function Methodology() {
  return (
    <Section tone="paper" aria-labelledby="methodology-heading">
      <SectionMeta index="05" label="Proprietary Methodology" />
      <h2 id="methodology-heading" className="sr-only">
        Methodology: Observe, Reason, Create, Ship
      </h2>

      <Reveal>
        <ol className="mt-10 flex flex-wrap items-center justify-center gap-4 text-center sm:gap-8">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-4 sm:gap-8">
              <span className="inline-block cursor-default font-display text-2xl font-black uppercase tracking-tight transition-transform duration-500 ease-out hover:rotate-360 hover:text-signal md:text-4xl">
                {step}
              </span>
              {i < steps.length - 1 ? (
                <span aria-hidden="true" className="spectrum-text font-mono text-xl">
                  —
                </span>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center font-mono text-xs uppercase tracking-widest text-ink/45">
          A repeatable process. Applied with judgement, not formula.
        </p>
      </Reveal>
    </Section>
  );
}
