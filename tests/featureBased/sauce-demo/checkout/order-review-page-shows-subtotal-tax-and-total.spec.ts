import { test, expect } from '@playwright/test';

test.describe('Checkout Process', () => {
  test('Order review page shows subtotal, 8 percent tax, and total', async ({ page }) => {
    // 1. Log in and add an item to the cart.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    const firstProduct = page.locator('.inventory_item').first();
    const priceText = (await firstProduct.locator('.inventory_item_price').textContent()) ?? '$0.00';
    const itemPrice = Number(priceText.replace('$', ''));
    await firstProduct.locator('button').click();
    await page.locator('#shopping_cart_container').click();

    // 2. Proceed to checkout and fill required billing details.
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Jane');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // 3. Validate subtotal, tax, and total.
    const subtotal = Number(itemPrice.toFixed(2));
    const tax = Number((subtotal * 0.08).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));
    await expect(page.locator('.summary_subtotal_label')).toContainText(`Item total: $${subtotal.toFixed(2)}`);
    await expect(page.locator('.summary_tax_label')).toContainText(`Tax: $${tax.toFixed(2)}`);
    await expect(page.locator('.summary_total_label')).toContainText(`Total: $${total.toFixed(2)}`);
  });
});
