import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { PlaceholderMedia } from "@/components/placeholder-media";
import { Pill } from "@/components/pill";
import { TypewriterWord } from "@/components/typewriter-word";
import { CtaLink } from "@/components/cta-link";
import { CaseStudyBlockView } from "@/components/case-study-block";
import { getProject, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.caseStudy?.summary ?? project.tagline,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const caseStudy = project.caseStudy;

  return (
    <article>
      <Section tone="paper" containerClassName="py-14 md:py-20" aria-labelledby="project-heading">
        <SectionMeta index="00" label="Case Study" />
        <SpectrumRule className="mt-6 mb-10 max-w-24" />
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-signal">
          {project.code}
        </p>
        <h1
          id="project-heading"
          className="mt-4 font-display text-5xl font-black uppercase leading-none tracking-tight md:text-8xl"
        >
          <TypewriterWord word={project.title} />
        </h1>
        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink/70 md:text-xl">
          {caseStudy?.summary ?? project.tagline}
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Pill as="li" key={tag}>
              {tag}
            </Pill>
          ))}
        </ul>

        {caseStudy?.intro ? (
          <div className="mt-10 flex max-w-2xl flex-col gap-4 border-t border-line-light/60 pt-8">
            {caseStudy.intro.map((paragraph) => (
              <p key={paragraph} className="font-body text-base leading-relaxed text-ink/70 md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        {caseStudy ? (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {caseStudy.launchUrl ? (
              <a
                href={caseStudy.launchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-opacity hover:opacity-80"
              >
                Launch {project.title} ↗
              </a>
            ) : (
              <span
                aria-disabled="true"
                title="Public launch link pending — not yet published"
                className="cursor-not-allowed rounded-full bg-ink/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink/50"
              >
                Launch {project.title} — coming soon
              </span>
            )}
          </div>
        ) : null}
      </Section>

      {project.screenshots && project.screenshots.length > 0 ? (
        <Section tone="ink" containerClassName="py-20 md:py-28">
          <div className="flex flex-col gap-20 md:gap-28">
            {project.screenshots.map((screenshot) => (
              <Reveal
                key={screenshot.src}
                className="mx-auto w-full max-w-2xl border border-paper/15"
              >
                {/* Real dimensions, not cropped to a fixed ratio — screenshots
                    arrive at whatever size they were captured. */}
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width}
                  height={screenshot.height}
                  sizes="(min-width: 768px) 672px, 90vw"
                  className="h-auto w-full"
                />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : (
        <Section tone="ink" containerClassName="py-14 md:py-20">
          <div className="aspect-video w-full text-paper">
            <PlaceholderMedia label={project.title} />
          </div>
        </Section>
      )}

      {caseStudy ? (
        <>
          <Section tone="paper">
            <div className="grid gap-14 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/50">
                Case study
              </p>
              <div className="flex flex-col gap-14">
                {caseStudy.sections.map((section) => (
                  <Reveal key={section.heading}>
                    <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">
                      {section.heading}
                    </h2>
                    <div className="mt-4 flex flex-col gap-4">
                      {/* Static, order-stable content — index is a safe key here. */}
                      {section.blocks.map((block, i) => (
                        <CaseStudyBlockView key={i} block={block} />
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Section>

          {caseStudy.stack && caseStudy.stack.length > 0 ? (
            <Section tone="paper" containerClassName="pt-0">
              <div className="grid gap-14 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/50">
                  Stack
                </p>
                <ul className="flex flex-wrap gap-2">
                  {caseStudy.stack.map((tech) => (
                    <Pill as="li" key={tech}>
                      {tech}
                    </Pill>
                  ))}
                </ul>
              </div>
            </Section>
          ) : null}
        </>
      ) : (
        <Section tone="paper">
          <p className="max-w-xl font-body text-base leading-relaxed text-ink/60">
            The full written case study for {project.title} is not yet
            published. Get in touch if you&rsquo;d like to hear about this
            engagement directly.
          </p>
        </Section>
      )}

      <Section tone="paper" containerClassName="pt-0">
        <CtaLink href="/work">Back to all work</CtaLink>
      </Section>
    </article>
  );
}
