import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Pill } from "@/components/pill";
import { TypewriterWord } from "@/components/typewriter-word";
import { siteConfig } from "@/lib/site-config";
import { engagementTypes } from "@/lib/contact";
import { EnquiryForm } from "@/components/enquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — ${siteConfig.location}.`,
};

export default function ContactPage() {
  return (
    <Section tone="paper" className="min-h-[60vh]" aria-labelledby="contact-heading">
      <SectionMeta index="00" label="Get In Touch" />
      <SpectrumRule className="mt-6 mb-10" />
      <h1
        id="contact-heading"
        className="max-w-3xl font-display text-5xl font-black uppercase leading-[0.98] tracking-tight md:text-7xl"
      >
        Have a problem worth <TypewriterWord word="solving?" />
      </h1>

      <ul className="mt-8 flex flex-wrap gap-2">
        {engagementTypes.map((type) => (
          <Pill as="li" key={type}>
            {type}
          </Pill>
        ))}
      </ul>

      <div className="mt-14 border-t border-line-light/60 pt-10">
        <EnquiryForm />
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-line-light/60 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50">Prefer email directly?</p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-display text-2xl font-medium underline decoration-signal underline-offset-8 transition-opacity hover:opacity-70 md:text-3xl"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
          {siteConfig.location}
        </p>
      </div>
    </Section>
  );
}
