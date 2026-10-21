import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders default and primary buttons", async ({ page }) => {
  await expect(page.getByTestId("button-default")).toBeVisible();
  await expect(page.getByTestId("button-default")).toHaveText("Default");
  await expect(page.getByTestId("button-primary")).toBeVisible();
  await expect(page.getByTestId("button-primary")).toHaveAttribute(
    "data-variant",
    "primary",
  );
});

test("disabled button is not clickable", async ({ page }) => {
  const disabled = page.getByTestId("button-disabled");
  await expect(disabled).toBeDisabled();
});

test("click increments counter", async ({ page }) => {
  await expect(page.getByTestId("click-count")).toHaveText("Clicks: 0");
  await page.getByTestId("button-clickable").click();
  await expect(page.getByTestId("click-count")).toHaveText("Clicks: 1");
  await page.getByTestId("button-clickable").click();
  await expect(page.getByTestId("click-count")).toHaveText("Clicks: 2");
});
