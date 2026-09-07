import { test, expect } from '@playwright/test';

test.describe('Product catalog', () => {
  test('Sort order is correct for all product sorting options', async ({ page }) => {
    // 1. Log in as a valid user.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 2. Capture initial product names and verify A-Z ordering.
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    const azNames = await page.locator('.inventory_item_name').allTextContents();
    expect([...azNames].slice().sort()).toEqual(azNames);

    // 3. Verify Z-A ordering.
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const zaNames = await page.locator('.inventory_item_name').allTextContents();
    expect([...zaNames].slice().sort((a, b) => b.localeCompare(a))).toEqual(zaNames);

    // 4. Verify low-high price ordering.
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const lohiPrices = (await page.locator('.inventory_item_price').allTextContents()).map((text) => Number(text.replace('$', '')));
    expect([...lohiPrices].slice().sort((a, b) => a - b)).toEqual(lohiPrices);

    // 5. Verify high-low price ordering.
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const hiloPrices = (await page.locator('.inventory_item_price').allTextContents()).map((text) => Number(text.replace('$', '')));
    expect([...hiloPrices].slice().sort((a, b) => b - a)).toEqual(hiloPrices);
  });
});
