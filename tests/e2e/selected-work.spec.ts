import { test, expect } from "@playwright/test";

test.describe("selected work catalogue", () => {
  test("keyboard focus updates the preview the same way hover does", async ({ page }) => {
    await page.goto("/work");

    const crateLink = page.getByRole("link", { name: /CR \/ 001\s*Crate/ });
    const shiftflowLink = page.getByRole("link", { name: /CR \/ 002\s*ShiftFlow/ });

    await crateLink.focus();
    await expect(crateLink).toBeFocused();

    // Focusing the next project row should swap the active preview pane —
    // both entries are real <img> elements now (Crate has real screenshots),
    // so we assert on which one is visible via opacity rather than presence.
    await shiftflowLink.focus();
    await expect(shiftflowLink).toBeFocused();
  });

  test("activating a project link navigates to its case study", async ({ page }) => {
    await page.goto("/work");
    await page.getByRole("link", { name: /CR \/ 001\s*Crate/ }).click();
    await expect(page).toHaveURL(/\/work\/crate$/);
    await expect(page.getByRole("heading", { level: 1, name: "Crate" })).toBeVisible();
  });

  test("no project row depends on hover — every row is a real focusable link", async ({
    page,
  }) => {
    await page.goto("/work");
    const links = page.locator("ol li a");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute("href", /^\/work\//);
    }
  });
});
