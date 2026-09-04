import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { ProjectCatalogue } from "@/components/project-catalogue";
import { InDevelopmentProducts } from "@/components/in-development-products";
import { CtaLink } from "@/components/cta-link";
import { projects } from "@/lib/projects";

export function SelectedWork() {
  return (
    <Section tone="paper" aria-labelledby="selected-work-heading">
      <SectionMeta index="03" label="Selected Work Catalogue" />
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

      <div className="mt-16 border-t border-line-light/60 pt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
          In development
        </p>
        <div className="mt-8">
          <InDevelopmentProducts />
        </div>
      </div>
    </Section>
  );
}
