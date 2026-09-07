import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test('Invalid and locked-out login handling', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Attempt login with incorrect password.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // 2. Attempt login as locked_out_user.
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.');
    await expect(page).not.toHaveURL(/\/inventory\.html$/);

    // 3. Attempt login with an unknown username.
    await page.locator('[data-test="username"]').fill('unknown_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');

    // 4. Verify the session is not authenticated.
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
