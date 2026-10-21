import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shows a default toast on click", async ({ page }) => {
  await page.getByRole("button", { name: "Default toast" }).click();
  await expect(page.getByRole("status")).toContainText("Hello from toast()");
});

test("shows a success toast", async ({ page }) => {
  await page.getByRole("button", { name: "Success toast" }).click();
  const toast = page.locator('[data-sonner-like-toast][data-type="success"]');
  await expect(toast).toContainText("Saved");
});

test("dismiss all clears toasts", async ({ page }) => {
  await page.getByRole("button", { name: "Default toast" }).click();
  await page.getByRole("button", { name: "Success toast" }).click();
  await expect(page.getByRole("status")).toHaveCount(2);

  await page.getByRole("button", { name: "Dismiss all" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
});