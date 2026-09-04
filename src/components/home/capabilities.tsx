import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { TypewriterWord } from "@/components/typewriter-word";
import { capabilityGroups } from "@/lib/consultancy";

/** The homepage's one, definitive capability taxonomy — see /studio and consultancy-intro.tsx's teaser for what deliberately stays out. */
export function Capabilities() {
  return (
    <Section tone="paper" aria-labelledby="capabilities-heading">
      <SectionMeta index="04" label="Capability Index" />
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

        <ol className="grid gap-x-8 gap-y-10 border-t border-line-light/60 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityGroups.map((group, i) => (
            <Reveal as="li" key={group.title} delayMs={i * 60} className="group">
              <p className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</p>
              <button
                type="button"
                className="mt-2 block text-left font-display text-lg font-semibold transition-colors duration-200 ease-out hover:text-signal focus-visible:text-signal"
              >
                {group.title}
              </button>

              {/* Expands in-flow (not an overlay) so it can never cover the
                  card in the row below. Always present for assistive tech —
                  visually collapsed until hover/focus, not conditionally
                  rendered, so the full breadth is available without relying
                  on hover. */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                <ul className="flex flex-col gap-1.5 overflow-hidden pt-3">
                  {group.items.map((item) => (
                    <li key={item} className="font-body text-xs leading-snug text-ink/65">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
