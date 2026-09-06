import Image from "next/image";
import { SectionMeta } from "@/components/section-meta";
import { Reveal } from "@/components/reveal";
import { Pill } from "@/components/pill";
import { TypewriterWord } from "@/components/typewriter-word";
import { CtaLink } from "@/components/cta-link";
import { getProject } from "@/lib/projects";

export function CrateFeature() {
  const crate = getProject("crate");
  if (!crate) return null;

  return (
    <section aria-labelledby="crate-heading" className="border-t border-line bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <SectionMeta index="01" label="Creative Reason Product" tone="paper" />

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-signal">
              {crate.code} — Local-first Sample Workspace
            </p>
            <h2
              id="crate-heading"
              className="mt-4 font-display text-6xl font-black uppercase leading-none tracking-tight md:text-8xl"
            >
              <TypewriterWord word={crate.title} />
            </h2>
            <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-paper/70 md:text-lg">
              {crate.tagline}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {crate.tags.map((tag) => (
                <Pill as="li" tone="dark" key={tag}>
                  {tag}
                </Pill>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span
                aria-disabled="true"
                title="Public launch link pending — not yet published"
                className="cursor-not-allowed rounded-full bg-paper/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper/50"
              >
                Launch product — coming soon
              </span>
              <CtaLink href="/work/crate" tone="dark">
                View case study
              </CtaLink>
            </div>
          </Reveal>

          <Reveal
            delayMs={100}
            className="relative aspect-1440/900 w-full overflow-hidden border border-paper/15"
          >
            {crate.screenshots?.[0] ? (
              <Image
                src={crate.screenshots[0].src}
                alt={crate.screenshots[0].alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
