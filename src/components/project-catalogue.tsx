"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { PlaceholderMedia } from "@/components/placeholder-media";
import type { Project } from "@/lib/projects";

type ProjectCatalogueProps = {
  projects: Project[];
};

/**
 * Typographic project index with a single responsive media pane. Hover and
 * keyboard focus receive identical treatment (both drive the active preview
 * via the same handlers on the link itself), and every row is a real link so
 * mobile taps navigate directly — no hover-only functionality anywhere here.
 */
export function ProjectCatalogue({ projects }: ProjectCatalogueProps) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug);

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <ol className="flex flex-col">
        {projects.map((project) => {
          const isActive = project.slug === activeSlug;
          return (
            <li key={project.slug} className="border-b border-line-light/50">
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => setActiveSlug(project.slug)}
                onFocus={() => setActiveSlug(project.slug)}
                className={cn(
                  "block py-4 transition-colors duration-150 md:py-5",
                  isActive ? "text-ink" : "text-ink/40 hover:text-ink"
                )}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-signal">{project.code}</span>
                  <span className="font-display text-2xl font-medium md:text-3xl">
                    {project.title}
                  </span>
                </span>
                <span className="mt-1.5 block max-w-md font-body text-sm leading-snug text-ink/60 line-clamp-2">
                  {project.tagline}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="relative hidden aspect-4/3 overflow-hidden border border-line-light/50 md:block">
        {projects.map((project) => (
          <div
            key={project.slug}
            aria-hidden={project.slug !== activeSlug}
            className={cn(
              "absolute inset-0 text-ink transition-opacity duration-300",
              project.slug === activeSlug ? "opacity-100" : "opacity-0"
            )}
          >
            {project.screenshots?.[0] ? (
              <Image
                src={project.screenshots[0].src}
                alt={project.screenshots[0].alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <PlaceholderMedia label={project.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
