import { test, expect } from "@playwright/test";

test.describe("primary navigation", () => {
  test("desktop nav links go to the right routes and mark the active page", async ({
    page,
    isMobile,
  }) => {
    // The desktop <nav> is intentionally `hidden md:flex` — MobileNavigation
    // is the equivalent surface below that breakpoint (see mobile-navigation.spec.ts).
    test.skip(isMobile, "desktop nav is hidden below md; covered by mobile-navigation.spec.ts");

    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
    await expect(nav.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products");
    await expect(nav.getByRole("link", { name: "Consultancy" })).toHaveAttribute(
      "href",
      "/consultancy"
    );
    await expect(nav.getByRole("link", { name: "Studio" })).toHaveAttribute("href", "/studio");
    await expect(nav.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");

    await nav.getByRole("link", { name: "Work" }).click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page");
  });

  test("header compacts after scrolling", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await expect(header).toHaveClass(/py-5/);

    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(header).toHaveClass(/py-3/);
  });

  test("skip link moves keyboard focus to main content", async ({ page, browserName }) => {
    // Safari/WebKit's default "Tab moves between form controls only, not
    // links" preference (Full Keyboard Access) means Tab never reaches a
    // plain <a> here unless that OS-level setting is on — a real Safari
    // default, not something this app controls. VoiceOver users (the actual
    // audience this setting matters for) reach the link fine via swipe
    // navigation regardless.
    test.skip(browserName === "webkit", "WebKit default: Tab does not cycle to links");

    await page.goto("/");
    await page.keyboard.press("Tab");

    const skipLinkFocused = await page.evaluate(
      () => document.activeElement?.getAttribute("href") === "#main-content"
    );
    expect(skipLinkFocused).toBe(true);

    await page.keyboard.press("Enter");
    const mainFocused = await page.evaluate(
      () => document.activeElement?.id === "main-content"
    );
    expect(mainFocused).toBe(true);
  });
});
