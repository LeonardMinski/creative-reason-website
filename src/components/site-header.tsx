"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { CreativeReasonMark } from "@/components/creative-reason-mark";
import { MobileNavigation } from "@/components/mobile-navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on navigation. Adjusted during render (React's
  // documented pattern for resetting state when a prop changes) rather than
  // in an effect, so it doesn't trigger an extra cascading render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stable identity: MobileNavigation depends on this in an effect, and an
  // inline arrow function here would give it a new identity on every
  // unrelated header re-render (e.g. on scroll), re-running that effect.
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        // Hidden from assistive tech while the mobile overlay is open, so it
        // doesn't expose a second "Close menu" button (or any background
        // content) behind the modal — standard dialog-pattern isolation.
        aria-hidden={menuOpen || undefined}
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-[padding,background-color] duration-200",
          scrolled
            ? "border-line-light/60 bg-paper/90 py-3 backdrop-blur"
            : "border-transparent bg-paper py-5"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-ink"
            aria-label={`${siteConfig.name} — home`}
          >
            <CreativeReasonMark size={scrolled ? 22 : 26} />
            <span
              className={cn(
                "font-display font-semibold tracking-tight transition-[font-size] duration-200",
                scrolled ? "text-sm" : "text-base"
              )}
            >
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className="group relative py-1 font-mono text-xs uppercase tracking-[0.12em] text-ink/70 transition-colors duration-150 hover:text-ink"
                >
                  {item.label}
                  <span
                    className={cn(
                      "spectrum-gradient absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100",
                      isActive && "scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <button
            ref={toggleButtonRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
              <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </header>

      <MobileNavigation open={menuOpen} onClose={closeMenu} triggerRef={toggleButtonRef} />
    </>
  );
}
