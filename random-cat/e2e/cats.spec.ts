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
