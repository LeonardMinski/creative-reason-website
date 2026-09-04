import { Reveal } from "@/components/reveal";
import { inDevelopmentProducts } from "@/lib/projects";

/**
 * Name + one-line description of products that are genuinely in early
 * development — no build to show yet, so no case study link, just an
 * explicit "Under construction" marker.
 */
export function InDevelopmentProducts() {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {inDevelopmentProducts.map((product, i) => (
        <Reveal key={product.slug} delayMs={i * 60}>
          <span className="inline-block rounded-full bg-signal/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-signal transition-all duration-200 ease-out hover:scale-105 hover:bg-signal/20">
            Under construction
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold">{product.title}</h3>
          <p className="mt-2 max-w-sm font-body text-sm text-ink/60">{product.tagline}</p>
        </Reveal>
      ))}
    </div>
  );
}
