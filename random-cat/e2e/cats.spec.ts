import { test, expect } from '@playwright/test';

test('displays list of cats on main page', async ({ page }) => {

  await page.goto('/');

  await page.waitForSelector('text=Cats List');

  const catItems = page.locator('.list-group-item');
  await expect(catItems).toHaveCount(3);

  await page.screenshot({ path: 'e2e/cats-loaded.png' });
});