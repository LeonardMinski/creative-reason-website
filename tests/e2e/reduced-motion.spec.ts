import { test, expect } from "@playwright/test";

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("reveal-on-scroll content still becomes visible, near-instantly", async ({ page }) => {
    await page.goto("/");

    const heading = page.locator("#capabilities-heading");
    await heading.scrollIntoViewIfNeeded();

    // Under prefers-reduced-motion the global stylesheet collapses transition
    // duration to ~0, so this should settle to opacity 1 almost immediately
    // rather than over the normal 500ms rise-and-fade.
    await expect(heading.locator("..")).toHaveCSS("opacity", "1", { timeout: 500 });
  });

  test("no horizontal overflow on a narrow viewport under reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasOverflow).toBe(false);
  });
});
