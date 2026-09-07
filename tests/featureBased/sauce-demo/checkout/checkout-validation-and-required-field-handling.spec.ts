import { test, expect } from '@playwright/test';

test.describe('Checkout Process', () => {
  test('Checkout validation and required field handling', async ({ page }) => {
    // 1. Log in as a valid user and go to checkout.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('.inventory_item').first().locator('button').click();
    await page.locator('#shopping_cart_container').click();
    await page.locator('[data-test="checkout"]').click();

    // 2. Attempt to submit with required fields missing.
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');

    // 3. Fill all required fields and retry.
    await page.locator('[data-test="firstName"]').fill('Jane');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('.summary_info')).toBeVisible();
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
  });
});
