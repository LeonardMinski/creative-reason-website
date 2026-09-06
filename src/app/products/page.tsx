import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { PlaceholderMedia } from "@/components/placeholder-media";
import { TypewriterWord } from "@/components/typewriter-word";
import { InDevelopmentProducts } from "@/components/in-development-products";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Products",
  description: "Products designed, engineered and released by Creative Reason.",
};

export default function ProductsPage() {
  // workType, not kind — this page is specifically Creative Reason's own
  // shipped products, not every self-directed build (e.g. ShiftFlow is
  // `kind: "product"` but a personal learning project, not a CR-branded
  // release, so it belongs in Work rather than here).
  const products = projects.filter((project) => project.workType === "Creative Reason Product");

  return (
    <Section tone="paper" className="min-h-[60vh]" aria-labelledby="products-heading">
      <SectionMeta index="00" label="Creative Reason Products" />
      <SpectrumRule className="mt-6 mb-10" />
      <h1
        id="products-heading"
        className="max-w-3xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl"
      >
        <TypewriterWord word="Products." />
      </h1>
      <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink/65">
        Creative Reason also builds and releases its own software — designed,
        engineered and maintained by the studio.
      </p>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        {products.map((product, i) => (
          <Reveal key={product.slug} delayMs={i * 80}>
            <Link href={`/work/${product.slug}`} className="group block">
              <div className="relative aspect-1440/900 w-full overflow-hidden">
                {product.screenshots?.[0] ? (
                  <Image
                    src={product.screenshots[0].src}
                    alt={product.screenshots[0].alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <PlaceholderMedia label={product.title} />
                )}
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-signal">
                {product.code}
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold group-hover:underline">
                {product.title}
              </h2>
              <p className="mt-2 max-w-md font-body text-sm text-ink/60">{product.tagline}</p>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 border-t border-line-light/60 pt-10">
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
