"use client";

import { useId, useState } from "react";
import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { TypewriterWord } from "@/components/typewriter-word";
import { capabilityGroups, type CapabilityGroup } from "@/lib/consultancy";

/** How many of each group's strongest items (see consultancy.ts ordering) show by default — the rest are one click away, not hidden behind hover. */
const VISIBLE_COUNT = 4;

function CapabilityCard({ group, index }: { group: CapabilityGroup; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const visible = group.items.slice(0, VISIBLE_COUNT);
  const rest = group.items.slice(VISIBLE_COUNT);

  return (
    <div>
      <p className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</p>
      <p className="mt-2 font-display text-lg font-semibold">{group.title}</p>

      <ul className="mt-3 flex flex-col gap-1.5">
        {visible.map((item) => (
          <li key={item} className="font-body text-xs leading-snug text-ink/65">
            {item}
          </li>
        ))}
      </ul>

      {rest.length > 0 ? (
        <>
          <ul id={listId} hidden={!expanded} className="mt-1.5 flex flex-col gap-1.5">
            {rest.map((item) => (
              <li key={item} className="font-body text-xs leading-snug text-ink/65">
                {item}
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded((value) => !value)}
            className="mt-2 font-mono text-[11px] uppercase tracking-widest text-ink/40 underline underline-offset-4 transition-colors hover:text-signal focus-visible:text-signal"
          >
            {expanded ? "Show less" : `+${rest.length} more`}
          </button>
        </>
      ) : null}
    </div>
  );
}

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
            Creative Reason moves across disciplines rather than handing off
            between them — the same person carries a problem from thinking
            through to shipped code.
          </p>
        </Reveal>

        <ol className="grid gap-x-8 gap-y-10 border-t border-line-light/60 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityGroups.map((group, i) => (
            <Reveal as="li" key={group.title} delayMs={i * 60}>
              <CapabilityCard group={group} index={i} />
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
