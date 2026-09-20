import { expect, test } from '@playwright/test'

test('starter page loads with its primary actions', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('img', { name: 'Next.js logo' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Deploy now/ })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Read our docs' })).toBeVisible()
})
