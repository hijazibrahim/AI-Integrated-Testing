import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test('Problem user can log in and browse products', async ({ page }) => {
    // 1. Open the login page.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Sign in with the problem user.
    await page.locator('[data-test="username"]').fill('problem_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 3. Confirm inventory page loads and product list is visible.
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);

    // 4. Verify the user can open a product detail page.
    await page.locator('.inventory_item_name').first().click();
    await expect(page.locator('.inventory_details_name')).toBeVisible();
  });
});
