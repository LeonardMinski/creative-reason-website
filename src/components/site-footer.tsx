import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-12 lg:px-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">{siteConfig.name}</p>
            <p className="mt-2 max-w-xs font-body text-sm text-paper/60">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 md:flex md:gap-8">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-xs uppercase tracking-[0.12em] text-paper/60 transition-colors hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="font-mono text-xs uppercase tracking-[0.12em] text-paper/60">
            <a href={`mailto:${siteConfig.contactEmail}`} className="block hover:text-paper">
              {siteConfig.contactEmail}
            </a>
            <p className="mt-2">{siteConfig.location}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-paper/10 pt-6 font-mono text-[11px] uppercase tracking-widest text-paper/40 md:flex-row md:items-center md:justify-between">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p>Designed and built by {siteConfig.founder}.</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="select-none overflow-hidden whitespace-nowrap px-4 pb-2 text-left font-display font-black leading-none text-paper/[0.06] text-[clamp(4rem,16vw,12rem)]"
      >
        {siteConfig.name}™
      </p>
    </footer>
  );
}
