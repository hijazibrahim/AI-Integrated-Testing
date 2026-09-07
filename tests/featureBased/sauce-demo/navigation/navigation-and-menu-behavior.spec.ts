import { test, expect } from '@playwright/test';

test.describe('Navigation & UI', () => {
  test('Navigation and menu behavior', async ({ page }) => {
    // 1. Log in as a valid user.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 2. Open the main menu and verify navigation options.
    await page.locator('#react-burger-menu-btn').click();
    await expect(page.locator('#inventory_sidebar_link')).toBeVisible();
    await expect(page.locator('#about_sidebar_link')).toBeVisible();
    await expect(page.locator('#logout_sidebar_link')).toBeVisible();

    // 3. Add an item to the cart and confirm the badge updates.
    await page.locator('#react-burger-cross-btn').click();
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#inventory_sidebar_link').click();
    await page.locator('.inventory_item').first().locator('button').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 4. Navigate to the cart and log out.
    await page.locator('#shopping_cart_container').click();
    await expect(page.locator('.cart_list')).toBeVisible();
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
