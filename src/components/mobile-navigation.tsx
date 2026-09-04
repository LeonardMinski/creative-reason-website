"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { CreativeReasonMark } from "@/components/creative-reason-mark";

type MobileNavigationProps = {
  open: boolean;
  onClose: () => void;
  /**
   * The button that opens this overlay. Focus returns here on close.
   * Deliberately explicit rather than capturing `document.activeElement` at
   * open time — on touch devices, tapping a button does not reliably focus
   * it the way a mouse click does, so that capture would silently grab
   * `<body>` instead under touch interaction.
   */
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNavigation({ open, onClose, triggerRef }: MobileNavigationProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Hide the rest of the document from assistive tech while this modal
    // overlay is open (the header is hidden by SiteHeader itself, since it
    // owns that element).
    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    main?.setAttribute("aria-hidden", "true");
    footer?.setAttribute("aria-hidden", "true");

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("aria-hidden");
      footer?.removeAttribute("aria-hidden");
      trigger?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <div
      ref={panelRef}
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      hidden={!open}
      className="fixed inset-0 z-50 flex flex-col bg-ink text-paper md:hidden"
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="flex items-center gap-2">
          <CreativeReasonMark tone="dark" size={18} />
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper/60">
            {siteConfig.name}
          </span>
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20"
        >
          <span className="sr-only">Close menu</span>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M1 1l16 16M17 1L1 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Primary">
        {primaryNav.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className="font-display text-4xl font-medium leading-tight text-paper transition-opacity duration-150 hover:opacity-70"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {item.label}
              {isActive ? <span className="spectrum-text ml-3 text-xl">●</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center justify-between border-t border-paper/10 px-6 py-5 font-mono text-[11px] uppercase tracking-widest text-paper/50">
        <span>Location: {siteConfig.location}</span>
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
      </div>
    </div>
  );
}
