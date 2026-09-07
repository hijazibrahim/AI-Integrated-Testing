import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test('Successful login and logout flow', async ({ page }) => {
    // 1. Open the SauceDemo login page.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Log in with a valid standard user.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('.inventory_list')).toBeVisible();

    // 3. Log out and verify the login page is displayed.
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
