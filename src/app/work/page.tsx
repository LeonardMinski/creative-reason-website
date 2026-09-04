import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { ProjectCatalogue } from "@/components/project-catalogue";
import { TypewriterWord } from "@/components/typewriter-word";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product and consultancy work from Creative Reason — an independent UX, design and technology studio in London.",
};

export default function WorkPage() {
  return (
    <Section tone="paper" className="min-h-[60vh]" aria-labelledby="work-heading">
      <SectionMeta index="00" label="Selected Work Catalogue" />
      <SpectrumRule className="mt-6 mb-10" />
      <h1
        id="work-heading"
        className="max-w-3xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl"
      >
        <TypewriterWord word="Work." />
      </h1>
      <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink/65">
        Products and consultancy engagements — designed and engineered end
        to end.
      </p>

      <div className="mt-14">
        <ProjectCatalogue projects={projects} />
      </div>
    </Section>
  );
}
