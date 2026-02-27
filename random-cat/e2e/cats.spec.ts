import { expect, Page, test } from '@playwright/test';

const cats = [
  {
    id: 1,
    name: 'Whiskers',
    age: 2,
    breed: 'Siamese',
  },
  {
    id: 2,
    name: 'Max',
    age: 3,
    breed: "Labrador - i would argue, if that's a cat breed",
  },
  {
    id: 3,
    name: 'Bella',
    age: 4,
    breed: 'Persian',
  },
];

const API_CATS_URL = 'http://localhost:3000/api/cats';

const stubCatsResponse = async (page: Page, cats: any[], delayMs = 0) => {
  await page.route(API_CATS_URL, async (route) => {
    if (delayMs > 0) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
    return route.fulfill({
      status: 200,
      body: JSON.stringify({ data: cats }),
    });
  });
};

test('should check if the page has cats', async ({ page }) => {
  await stubCatsResponse(page, cats);

  // Given I am on the main page

  await page.goto('/');

  // When the list is loaded
  const catItems = page.locator(
    '[role="list"][aria-label="List of cats"] [role="listitem"]',
  );

  // Then there should be as many cats as in the data
  await expect(catItems).toHaveCount(cats.length);
});

test('should show spinner while loading cats', async ({ page }) => {
  await stubCatsResponse(page, cats, 2000);

  await page.goto('/');

  // role="progressbar" aria-label="Loading"
  const spinner = page.locator('[data-testid="loading-spinner"]');
  await expect(spinner).toBeVisible();

  const catList = page.locator('[role="list"][aria-label="List of cats"]');
  await expect(catList).not.toBeVisible();

  await expect(spinner).not.toBeVisible();
  await expect(catList).toBeVisible();
});

test('should show empty state when no cats', async ({ page }) => {
  await stubCatsResponse(page, []);

  await page.goto('/');

  const emptyState = page.locator('text=Sorry no cats today');
  await expect(emptyState).toBeVisible();
});

test('should remove cat when x button is pressed at first row', async ({
  page,
}) => {
  await stubCatsResponse(page, cats);

  await page.route(/http:\/\/localhost:3000\/api\/cats\/\d+/, async (route) => {
    if (route.request().method() === 'DELETE') {
      return route.fulfill({ status: 200 });
    }
    return route.continue();
  });

  await page.goto('/');

  const firstRowRemoveBtn = page
    .locator('[role="list"][aria-label="List of cats"] [role="listitem"]')
    .first()
    .getByRole('button');
  await firstRowRemoveBtn.click();

  const modal = page.locator('[role="dialog"]');
  await expect(modal).toBeVisible();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await stubCatsResponse(page, cats.slice(1));

  const catItems = page.locator(
    '[role="list"][aria-label="List of cats"] [role="listitem"]',
  );
  await expect(catItems).toHaveCount(cats.length - 1);
});

// @todo: adjust this test as above: do not use data-testid
test('should close modal and keep cat when cancel is pressed', async ({
  page,
}) => {
  await stubCatsResponse(page, cats);

  await page.goto('/');

  const catItems = page.locator(
    '[role="list"][aria-label="List of cats"] [role="listitem"]',
  );
  await expect(catItems).toHaveCount(3);

  const firstRowRemoveBtn = page
    .locator('[role="list"][aria-label="List of cats"] [role="listitem"]')
    .first()
    .locator('[data-testid="remove-cat-btn"]');
  await firstRowRemoveBtn.click();

  const modal = page.locator('[data-testid="remove-cat-modal"]');
  await expect(modal).toBeVisible();
  await page.locator('[data-testid="remove-cat-cancel"]').click();

  await expect(modal).not.toBeVisible();
  await expect(catItems).toHaveCount(3);
});

test('should add cat when + button is pressed, form filled and confirm clicked', async ({
  page,
}) => {
  let currentCats = [...cats];
  await page.route(API_CATS_URL, async (route) => {
    const req = route.request();
    if (req.method() === 'POST') {
      const body = req.postDataJSON();
      const newCat = {
        id: currentCats.length + 1,
        name: body.name,
        age: body.age,
        breed: body.breed,
      };
      currentCats = [...currentCats, newCat];
      return route.fulfill({
        status: 201,
        body: JSON.stringify(newCat),
      });
    }
    return route.fulfill({
      status: 200,
      body: JSON.stringify({ data: currentCats }),
    });
  });

  await page.goto('/');

  const addButton = page.getByRole('button', { name: 'Add cat' });
  await expect(addButton).toBeVisible();
  await addButton.click();

  const addDialog = page.getByRole('dialog', { name: 'Add cat' });
  await expect(addDialog).toBeVisible();
  await page.getByLabel('Name').fill('Fluffy');
  await page.getByLabel('Age').fill('1');
  await page.getByLabel('Breed').fill('Tabby');
  await addDialog.getByRole('button', { name: 'Confirm' }).click();

  const catItems = page.locator(
    '[role="list"][aria-label="List of cats"] [role="listitem"]',
  );
  await expect(catItems).toHaveCount(4);
  await expect(addDialog).not.toBeVisible();
});
