import { SectionMeta } from "@/components/section-meta";
import { Reveal } from "@/components/reveal";
import { TypewriterWord } from "@/components/typewriter-word";

const items = [
  "Responsive behaviour",
  "Interaction design",
  "Accessibility (WCAG)",
  "Component architecture",
  "Design systems",
  "Frontend engineering",
  "Performance",
  "Production quality",
];

export function DesignEngineering() {
  return (
    <section aria-labelledby="design-engineering-heading" className="border-t border-line bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <SectionMeta index="09" label="Design Systems & Quality" tone="paper" />

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2
              id="design-engineering-heading"
              className="font-display text-4xl font-black uppercase leading-[1.02] tracking-tight md:text-6xl"
            >
              Design doesn&rsquo;t end when Figma <TypewriterWord word="does." />
            </h2>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-paper/65">
              We think in components, states, responsive behaviour,
              accessibility and performance — because design decisions that
              ignore implementation create debt.
            </p>
          </Reveal>

          <Reveal delayMs={80}>
            <ul className="divide-y divide-paper/10 border-t border-paper/10">
              {items.map((item) => (
                <li
                  key={item}
                  className="group flex cursor-default items-center justify-between px-2 py-4 font-display text-lg transition-colors duration-200 ease-out hover:bg-paper/5 hover:pl-4 hover:text-signal"
                  style={{ transitionProperty: "color, background-color, padding" }}
                >
                  {item}
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full bg-signal transition-transform duration-200 ease-out group-hover:scale-150"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
