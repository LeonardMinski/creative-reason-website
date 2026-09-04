import { CreativeReasonMark } from "@/components/creative-reason-mark";
import { TypewriterWord } from "@/components/typewriter-word";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 pb-16 pt-14 text-center md:px-12 md:pb-24 md:pt-20 lg:px-16">
        <p className="animate-hero-enter [animation-delay:0ms] font-mono text-xs uppercase tracking-[0.14em] text-ink/50">
          Independent UX, Design + Technology Studio — London
        </p>

        <CreativeReasonMark
          animated
          className="animate-hero-enter mx-auto mt-10 w-56 [animation-delay:160ms] sm:w-72 md:w-80 lg:w-96"
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 288px, 224px"
        />

        <h1
          id="hero-heading"
          className="animate-hero-enter [animation-delay:380ms] mt-8 font-display font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.75rem,9vw,5.5rem)]"
        >
          Creative
          <br />
          <TypewriterWord word="Reason" />
          <span className="align-super text-[0.3em]">™</span>
        </h1>

        <p className="animate-hero-enter [animation-delay:620ms] mt-6 max-w-md font-body text-lg text-ink/70 md:text-xl">
          {siteConfig.tagline}
        </p>
      </div>
    </section>
  );
}
