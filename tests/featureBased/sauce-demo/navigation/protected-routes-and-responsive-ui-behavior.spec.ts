import { test, expect } from '@playwright/test';

test.describe('Navigation & UI', () => {
  test('Protected routes and responsive UI behavior', async ({ page }) => {
    // 1. Attempt to access protected routes without authentication.
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Log in and verify the inventory page remains usable at tablet width.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);

    // 3. Verify the app remains usable at mobile width.
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();

    // 4. Trigger an invalid action and verify a validation response is shown.
    await page.locator('#shopping_cart_container').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});
