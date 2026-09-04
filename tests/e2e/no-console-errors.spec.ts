import { test, expect } from "@playwright/test";

const pages = ["/", "/work", "/products", "/consultancy", "/studio", "/contact", "/work/crate"];

test.describe("console hygiene", () => {
  for (const path of pages) {
    test(`${path} has no console errors or hydration warnings`, async ({ page }) => {
      const messages: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") messages.push(msg.text());
      });
      page.on("pageerror", (err) => messages.push(err.message));

      await page.goto(path, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);

      const realIssues = messages.filter(
        (m) => !m.includes("Download the React DevTools")
      );
      expect(realIssues, realIssues.join("\n")).toEqual([]);
    });
  }
});
