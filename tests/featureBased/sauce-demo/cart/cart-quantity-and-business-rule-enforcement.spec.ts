import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test('Cart quantity and business rule enforcement', async ({ page }) => {
    // 1. Log in as a valid user.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('.inventory_list')).toBeVisible();

    // 2. Attempt to add the same product twice.
    const firstProductButton = page.locator('.inventory_item').first().locator('button');
    await firstProductButton.click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await expect(firstProductButton).toHaveText('Remove');

    // 3. Remove the item and confirm the cart is cleared and the summary is not shown for an empty cart.
    await firstProductButton.click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    await page.locator('#shopping_cart_container').click();
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('.summary_subtotal_label')).toHaveCount(0);
  });
});
