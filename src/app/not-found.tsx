import { Section } from "@/components/section";
import { TypewriterWord } from "@/components/typewriter-word";
import { CtaLink } from "@/components/cta-link";

export default function NotFound() {
  return (
    <Section tone="paper" className="flex min-h-[60vh] items-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-signal">404</p>
        <h1 className="mt-4 font-display text-4xl font-black uppercase tracking-tight md:text-6xl">
          Page not <TypewriterWord word="found." />
        </h1>
        <p className="mt-6 max-w-md font-body text-base text-ink/65">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <CtaLink href="/" className="mt-8">
          Back to home
        </CtaLink>
      </div>
    </Section>
  );
}
