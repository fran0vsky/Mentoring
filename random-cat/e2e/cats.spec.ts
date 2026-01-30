import { expect, test } from '@playwright/test';

const cats =  [
    {
      "id": 1,
      "name": "Whiskers",
      "age": 2,
      "breed": "Siamese"
    },
    {
      "id": 2,
      "name": "Max",
      "age": 3,
      "breed": "Labrador - i would argue, if that's a cat breed"
    },
    {
      "id": 3,
      "name": "Bella",
      "age": 4,
      "breed": "Persian"
    }
  ];

test('should check if the page has cats', async ({ page }) => {

  // Given I am on the main page
  await page.route('/cats.json', (route) => {
    return route.fulfill({
      status: 200,
      body: JSON.stringify({ data: cats })
    });
  });
  await page.goto('/');

  // When the list is loaded
  const catItems = page.locator('[role="list"][aria-label="List of cats"] [role="listitem"]');

  // Then there should be as many cats as in the data
  await expect(catItems).toHaveCount(cats.length);
});

test('should show spinner while loading cats', async ({ page }) => {
  await page.route('/cats.json', async (route) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return route.fulfill({
      status: 200,
      body: JSON.stringify({ data: cats })
    });
  });
  
  await page.goto('/');
  
  const spinner = page.locator('[data-testid="loading-spinner"]');
  await expect(spinner).toBeVisible();
  
  const catList = page.locator('[role="list"][aria-label="List of cats"]');
  await expect(catList).not.toBeVisible();
  
  await page.waitForResponse('/cats.json');
  
  await expect(spinner).not.toBeVisible();
  await expect(catList).toBeVisible();
  
  const catItems = page.locator('[role="list"][aria-label="List of cats"] [role="listitem"]');
  await expect(catItems).toHaveCount(cats.length);
});

test('should show empty state when no cats', async ({ page }) => {
  await page.route('/cats.json', (route) => {
    return route.fulfill({
      status: 200,
      body: JSON.stringify({ data: [] })
    });
  });
  
  await page.goto('/');
  
  await page.waitForResponse('/cats.json');
  
  const emptyState = page.locator('text=Sorry no cats today');
  await expect(emptyState).toBeVisible();
});
