import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { ProjectCatalogue } from "@/components/project-catalogue";
import { CtaLink } from "@/components/cta-link";
import { projects } from "@/lib/projects";

/** Deliberately shipped-work only — in-development products stay on /products, not next to real, proven evidence. */
export function SelectedWork() {
  return (
    <Section tone="paper" aria-labelledby="selected-work-heading">
      <SectionMeta index="02" label="Selected Work Catalogue" />
      <SpectrumRule className="mt-6 mb-10" />

      <div className="flex items-baseline justify-between gap-4">
        <Reveal>
          <h2 id="selected-work-heading" className="sr-only">
            Selected work
          </h2>
        </Reveal>
        <CtaLink href="/work">View all work</CtaLink>
      </div>

      <div className="mt-6">
        <ProjectCatalogue projects={projects} />
      </div>
    </Section>
  );
}
