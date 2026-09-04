import { test, expect, devices } from "@playwright/test";

test.use({ ...devices["iPhone 13"] });

test.describe("mobile navigation", () => {
  test("hamburger opens a full-screen overlay with working aria-expanded state", async ({
    page,
  }) => {
    await page.goto("/");

    // Selecting by its stable aria-controls rather than accessible name: the
    // name toggles between "Open menu"/"Close menu", and once open, the
    // header (and this button) is aria-hidden — see mobile-navigation.tsx.
    const toggle = page.locator('button[aria-controls="mobile-navigation"]');
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const overlay = page.getByRole("dialog", { name: "Site navigation" });
    await expect(overlay).toBeVisible();
    for (const label of ["Work", "Products", "Consultancy", "About the Founder", "Contact"]) {
      await expect(overlay.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("Escape closes the overlay and returns focus to the trigger", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeHidden();

    const returnedFocusToTrigger = await page.evaluate(
      () => document.activeElement?.getAttribute("aria-controls") === "mobile-navigation"
    );
    expect(returnedFocusToTrigger).toBe(true);
  });

  test("body scroll is locked while the overlay is open", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe("hidden");

    await page.keyboard.press("Escape");
    const overflowAfter = await page.evaluate(() => document.body.style.overflow);
    expect(overflowAfter).not.toBe("hidden");
  });

  test("selecting a link closes the menu and navigates", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("dialog", { name: "Site navigation" })
      .getByRole("link", { name: "About the Founder" })
      .click();

    await expect(page).toHaveURL(/\/studio$/);
    await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeHidden();
  });
});
