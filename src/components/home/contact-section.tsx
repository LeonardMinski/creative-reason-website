import Link from "next/link";
import { SectionMeta } from "@/components/section-meta";
import { Reveal } from "@/components/reveal";
import { TypewriterWord } from "@/components/typewriter-word";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-line bg-ink text-paper"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <SectionMeta index="08" label="Get In Touch" tone="paper" />

        <Reveal>
          <h2
            id="contact-heading"
            className="mt-8 max-w-3xl font-display text-5xl font-black uppercase leading-[0.98] tracking-tight md:text-7xl"
          >
            Have a problem worth <TypewriterWord word="solving?" />
          </h2>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-paper/65 md:text-lg">
            Bring Creative Reason in at the problem, the idea or the build.
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-transform duration-200 ease-out hover:scale-105"
          >
            Start your enquiry
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>

        <Reveal delayMs={140}>
          <div className="mt-8 flex flex-col gap-4 border-t border-paper/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-paper/50">Prefer email directly?</p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-display text-2xl font-medium underline decoration-signal underline-offset-8 transition-opacity hover:opacity-70 md:text-3xl"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
              {siteConfig.location}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
