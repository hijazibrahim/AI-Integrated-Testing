import { test, expect } from '@playwright/test';

test.describe('Navigation & UI', () => {
  test('Protected routes redirect unauthenticated users away from inventory and cart pages', async ({ page }) => {
    // 1. Attempt to open inventory page without login.
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Attempt to open cart page without login.
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 3. Log in and confirm protected pages are available.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.cart_list')).toBeVisible();
  });
});
