import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test('Add, remove, and review cart items', async ({ page }) => {
    // 1. Log in as a valid user.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('.inventory_list')).toBeVisible();

    // 2. Add a product from the inventory page.
    const firstProduct = page.locator('.inventory_item').first();
    const firstProductName = (await firstProduct.locator('.inventory_item_name').textContent()) ?? '';
    const firstProductButton = firstProduct.locator('button');
    await firstProductButton.click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 3. Add a second product from the product details page.
    await page.locator('.inventory_item').nth(1).locator('.inventory_item_name').click();
    await page.locator('button').filter({ hasText: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    //4.Review cart contents and totals.
    await page.locator('#shopping_cart_container').click();
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.cart_item').filter({ hasText: firstProductName }).first()).toContainText(firstProductName);
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();

    // 5. Remove one item and continue shopping.
    await page.locator('.cart_item').first().locator('button').click();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
