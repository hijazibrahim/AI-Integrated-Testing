import { test, expect } from '@playwright/test';

test.describe('Checkout Process', () => {
  test('Complete a valid checkout flow', async ({ page }) => {
    // 1. Log in as a valid user and add a product to the cart.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    const firstItem = page.locator('.inventory_item').first();
    const unitPriceText = (await firstItem.locator('.inventory_item_price').textContent()) ?? '$0.00';
    const subtotal = Number(unitPriceText.replace('$', ''));
    await firstItem.locator('button').click();
    await page.locator('#shopping_cart_container').click();

    // 2. Proceed to checkout.
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('[data-test="firstName"]').or(page.locator('#first-name'))).toBeVisible();

    // 3. Enter valid customer information.
    await page.locator('[data-test="firstName"]').fill('Jane');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('.summary_info')).toBeVisible();

    // 4. Review the order summary with tax calculation.
    const expectedTax = Number((subtotal * 0.08).toFixed(2));
    const expectedTotal = Number((subtotal + expectedTax).toFixed(2));
    await expect(page.locator('.summary_subtotal_label')).toContainText(`Item total: $${subtotal.toFixed(2)}`);
    await expect(page.locator('.summary_tax_label')).toContainText(`Tax: $${expectedTax.toFixed(2)}`);
    await expect(page.locator('.summary_total_label')).toContainText(`Total: $${expectedTotal.toFixed(2)}`);

    // 5. Complete the order and confirm the confirmation page.
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();

    // 6. Navigate back to the products page.
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
