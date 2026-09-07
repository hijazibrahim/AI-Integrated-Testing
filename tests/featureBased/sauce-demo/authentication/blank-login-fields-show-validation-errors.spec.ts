import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test('Blank login fields show validation errors', async ({ page }) => {
    // 1. Open the login page.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Submit with no username and no password.
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('required');

    // 3. Try only username and confirm password is required.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');

    // 4. Try only password and confirm username is required.
    await page.locator('[data-test="username"]').fill('');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
});
