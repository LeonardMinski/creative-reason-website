import { Section } from "@/components/section";
import { SectionMeta } from "@/components/section-meta";
import { SpectrumRule } from "@/components/spectrum-rule";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <Section tone="paper" aria-labelledby="testimonials-heading">
      <SectionMeta index="10" label="What Clients Say" />
      <SpectrumRule className="mt-6 mb-10" />
      <h2 id="testimonials-heading" className="sr-only">
        What clients say
      </h2>

      <ul className="grid gap-10 border-t border-line-light/60 pt-10 text-center md:grid-cols-3 md:gap-16 lg:gap-20">
        {testimonials.map((testimonial, i) => (
          <Reveal as="li" key={testimonial.name} delayMs={i * 80}>
            <p className="font-editorial text-lg italic leading-relaxed text-ink/80 md:text-xl">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="mt-5 font-mono text-xs uppercase tracking-widest text-ink/50">
              {testimonial.name} — {testimonial.role}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
