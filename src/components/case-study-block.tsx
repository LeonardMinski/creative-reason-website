import type { CaseStudyBlock } from "@/lib/projects";

const bodyClass = "max-w-2xl font-body text-base leading-relaxed text-ink/70";

export function CaseStudyBlockView({ block }: { block: CaseStudyBlock }) {
  switch (block.kind) {
    case "paragraph":
      return <p className={bodyClass}>{block.text}</p>;

    case "emphasis":
      return (
        <p className="max-w-2xl font-display text-xl font-semibold leading-snug tracking-tight text-ink md:text-2xl">
          {block.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      );

    case "flow":
      return (
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-widest text-signal">
          {block.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span>{step}</span>
              {i < block.steps.length - 1 ? (
                <span aria-hidden="true" className="text-ink/30">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      );

    case "definitions":
      return (
        <dl className="grid gap-6 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.term} className="border-t border-line-light/60 pt-3">
              <dt className="font-display text-sm font-semibold uppercase tracking-tight text-ink">
                {item.term}
              </dt>
              <dd className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "list":
      return (
        <ul className="grid gap-x-8 gap-y-1.5 font-body text-base leading-relaxed text-ink/70 sm:grid-cols-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
              {item}
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}
