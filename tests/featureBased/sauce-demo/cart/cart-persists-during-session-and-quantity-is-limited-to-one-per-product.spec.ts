import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test('Cart persists during session and quantity is limited to one per product', async ({ page }) => {
    // 1. Log in as a valid user and add a product.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    const firstProduct = page.locator('.inventory_item').first();
    await firstProduct.locator('button').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 2. Browse away and verify the cart is still present.
    await firstProduct.locator('.inventory_item_name').click();
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await page.goBack();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 3. Remove the item from the product list and then re-add it to confirm the cart state is stable.
    await firstProduct.locator('button').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    await firstProduct.locator('button').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('#shopping_cart_container').click();
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });
});
