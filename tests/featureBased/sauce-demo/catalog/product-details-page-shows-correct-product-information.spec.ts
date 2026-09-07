import { test, expect } from '@playwright/test';

test.describe('Product catalog', () => {
  test('Product details page shows correct product information', async ({ page }) => {
    // 1. Log in as a valid user.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('.inventory_list')).toBeVisible();

    // 2. Open a product from the inventory page.
    const productCard = page.locator('.inventory_item').first();
    const expectedName = (await productCard.locator('.inventory_item_name').textContent()) ?? '';
    const expectedPrice = (await productCard.locator('.inventory_item_price').textContent()) ?? '';
    await productCard.locator('.inventory_item_name').click();
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=/);

    // 3. Verify the details page shows the correct product information.
    const detailName = page.locator('.inventory_details_name');
    const detailPrice = page.locator('.inventory_details_price');
    const detailDescription = page.locator('.inventory_details_desc');
    const detailImage = page.locator('.inventory_details_img');
    await expect(detailName).toContainText(expectedName);
    await expect(detailPrice).toContainText(expectedPrice);
    await expect(detailDescription).toBeVisible();
    await expect(detailImage).toBeVisible();

    // 4. Navigate back to the inventory page.
    await page.goBack();
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
