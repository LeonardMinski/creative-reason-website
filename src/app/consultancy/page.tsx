import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { TypewriterWord } from "@/components/typewriter-word";
import { consultancyMethod } from "@/lib/consultancy";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Consultancy",
  description:
    "UX consultancy from Creative Reason — audits, discovery, research and strategy that turn ambiguity into a shippable direction.",
};

export default function ConsultancyPage() {
  const engagements = projects.filter((project) => project.kind === "consultancy");

  return (
    <>
      <Section tone="paper" containerClassName="py-16 md:py-24" aria-labelledby="consultancy-heading">
        <SectionMeta index="00" label="Consultancy" />
        <SpectrumRule className="mt-6 mb-10" />
        <h1
          id="consultancy-heading"
          className="max-w-3xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl"
        >
          Before designing, find out <TypewriterWord word="why." />
        </h1>
        <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink/65 md:text-lg">
          Most design problems are symptoms of upstream decisions. Creative
          Reason starts by understanding the real problem — then designs
          toward a solution that addresses it.
        </p>

        <ol className="mt-14 grid gap-x-10 gap-y-6 border-t border-line-light/60 pt-10 md:grid-cols-3">
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
      </Section>

      {engagements.length > 0 ? (
        <Section tone="ink">
          <SectionMeta index="01" label="Selected Engagements" tone="paper" />
          <SpectrumRule className="mt-6 mb-10" />
          <ul className="flex flex-col divide-y divide-paper/10 border-t border-paper/10">
            {engagements.map((engagement) => (
              <li key={engagement.slug} className="py-5">
                <Link href={`/work/${engagement.slug}`} className="group block">
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-signal">{engagement.code}</span>
                    <span className="font-display text-2xl font-medium text-paper transition-opacity group-hover:opacity-70 md:text-3xl">
                      {engagement.title}
                    </span>
                  </span>
                  <span className="mt-1.5 block max-w-lg font-body text-sm leading-snug text-paper/60">
                    {engagement.tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
