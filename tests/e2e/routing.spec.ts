import { test, expect } from "@playwright/test";

const staticRoutes = [
  ["/", "Creative"],
  ["/work", "Work."],
  ["/products", "Products."],
  ["/consultancy", "Before designing, find out why."],
  ["/studio", "Designer. Engineer."],
  ["/contact", "Have a problem worth solving?"],
];

const projectRoutes = ["crate", "shiftflow", "station-ten"];

test.describe("routing", () => {
  for (const [path, expectedText] of staticRoutes) {
    test(`${path} renders its primary heading`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(expectedText, {
        ignoreCase: true,
      });
    });
  }

  for (const slug of projectRoutes) {
    test(`/work/${slug} case study renders`, async ({ page }) => {
      const response = await page.goto(`/work/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  test("an unknown route renders the 404 page, not a crash", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Page not found.")).toBeVisible();
    await expect(page.getByRole("link", { name: /Back to home/i })).toHaveAttribute("href", "/");
  });

  test("PRODUCTS is present in primary navigation and Products lists Crate", async ({ page }) => {
    await page.goto("/products");
    await expect(page.getByRole("link", { name: "Crate" })).toBeVisible();
  });

  test("Lab has been removed: no nav link, no route", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Lab" })).toHaveCount(0);

    const response = await page.goto("/lab");
    expect(response?.status()).toBe(404);
  });

  test("Products lists the in-development products as under construction", async ({ page }) => {
    await page.goto("/products");
    for (const name of ["Barterbase", "SheSync+", "Preferences"]) {
      await expect(page.getByRole("heading", { name })).toBeVisible();
    }
    await expect(page.getByText("Under construction").first()).toBeVisible();
  });
});
