import { test, expect } from '@playwright/test';

test.describe('Product catalog', () => {
  test('Inventory page displays products and supports sorting', async ({ page }) => {
    // 1. Log in as a valid user.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('.inventory_list')).toBeVisible();

    // 2. Verify all products display.
    const productNames = page.locator('.inventory_item_name');
    await expect(productNames).toHaveCount(6);
    const names = await productNames.allTextContents();
    expect(names.length).toBeGreaterThan(0);

    // 3. Sort by Name A-Z.
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    const azNames = await productNames.allTextContents();
    expect([...azNames].slice().sort()).toEqual(azNames);

    // 4. Sort by Name Z-A.
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const zaNames = await productNames.allTextContents();
    expect([...zaNames].slice().sort((a, b) => b.localeCompare(a))).toEqual(zaNames);

    // 5. Sort by Price low-high.
    const prices = page.locator('.inventory_item_price');
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const lowHigh = await prices.allTextContents();
    const lowHighNumbers = lowHigh.map((value) => Number(value.replace('$', '')));
    expect([...lowHighNumbers].sort((a, b) => a - b)).toEqual(lowHighNumbers);

    // 6. Sort by Price high-low.
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const highLow = await prices.allTextContents();
    const highLowNumbers = highLow.map((value) => Number(value.replace('$', '')));
    expect([...highLowNumbers].sort((a, b) => b - a)).toEqual(highLowNumbers);
  });
});
