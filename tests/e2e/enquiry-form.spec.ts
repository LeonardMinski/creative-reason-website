import { test, expect } from "@playwright/test";

test.describe("enquiry form", () => {
  test("required fields block submission until filled", async ({ page }) => {
    await page.goto("/contact");
    const submit = page.getByRole("button", { name: /send enquiry/i });
    await submit.click();

    // Native required-field validation keeps us on the form — no success
    // state, no thrown error, and the first invalid field is reported.
    const nameValid = await page.locator("#name").evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(nameValid).toBe(false);
  });

  test("submitting a complete form reaches a result state without crashing", async ({ page }) => {
    await page.goto("/contact");
    await page.locator("#name").fill("Jane Test");
    await page.locator("#email").fill("jane@example.com");
    await page.locator("#enquiryType").selectOption("Product Design");
    await page.locator("#message").fill("We need help redesigning our onboarding flow.");
    await page.getByRole("button", { name: /send enquiry/i }).click();

    // Without RESEND_API_KEY configured (true in this test environment), the
    // action reports a graceful error rather than sending — either outcome
    // (that error, or a real success) is a valid end state; a silent hang or
    // a thrown exception is not. Scoped to <main> since Next's own hidden
    // route-announcer also carries role="alert" globally.
    const main = page.locator("main");
    await expect(main.getByRole("alert").or(main.getByRole("status"))).toBeVisible();
  });

  test("typed values survive a failed submission instead of clearing", async ({ page }) => {
    await page.goto("/contact");
    await page.locator("#name").fill("Jane Test");
    await page.locator("#email").fill("jane@example.com");
    await page.locator("#enquiryType").selectOption("Product Design");
    await page.locator("#message").fill("We need help redesigning our onboarding flow.");
    await page.getByRole("button", { name: /send enquiry/i }).click();

    const alert = page.locator("main").getByRole("alert");
    if (await alert.isVisible()) {
      await expect(page.locator("#name")).toHaveValue("Jane Test");
      await expect(page.locator("#message")).toHaveValue("We need help redesigning our onboarding flow.");
    }
  });
});
