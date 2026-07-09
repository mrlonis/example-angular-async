import { expect, test } from '@playwright/test';

test.describe('example-angular-async', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/fake1', (route) => route.fulfill({ json: { fake: 'fake1' } }));
    await page.route('**/api/fake2', async (route) => {
      await new Promise<void>((resolve) => setTimeout(resolve, 10000));
      await route.fulfill({ json: { fake: 'fake2' } });
    });
    await page.route('**/api/fake3', async (route) => {
      await new Promise<void>((resolve) => setTimeout(resolve, 10000));
      await route.fulfill({ json: { fake: 'fake3' } });
    });
    await page.route('**/api/fake4', async (route) => {
      await new Promise<void>((resolve) => setTimeout(resolve, 10000));
      await route.fulfill({ json: { fake: 'fake4' } });
    });
    await page.route('**/api/fake5', async (route) => {
      await new Promise<void>((resolve) => setTimeout(resolve, 10000));
      await route.fulfill({ json: { fake: 'fake5' } });
    });

    await page.goto('/');
  });

  test('shows the application title in the document title', async ({ page }) => {
    await expect(page).toHaveTitle(/ExampleAngularAsync/);
  });

  test('should load', async ({ page }) => {
    test.setTimeout(60000);

    await expect(page.locator('.loading')).toBeVisible();
    await expect(page.locator('.loading-done')).not.toBeVisible();

    await expect(page.locator('.ng-on-init-done')).toBeVisible();
    await expect(page.locator('.loading')).toBeVisible();
    await expect(page.locator('.loading-done')).not.toBeVisible();

    await page.waitForResponse('**/api/fake2');
    await page.waitForResponse('**/api/fake3');
    await page.waitForResponse('**/api/fake4');
    await page.waitForResponse('**/api/fake5');
  });
});
