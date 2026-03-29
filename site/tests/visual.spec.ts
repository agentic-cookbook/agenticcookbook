import { test, expect } from '@playwright/test'

test.describe('Visual regression — dark mode', () => {
  test('homepage', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(1000)
    await expect(page).toHaveScreenshot('homepage-dark.png', { fullPage: true })
  })

  test('principles section index', async ({ page }) => {
    await page.goto('/principles')
    await page.waitForTimeout(1000)
    await expect(page).toHaveScreenshot('principles-dark.png', { fullPage: true })
  })

  test('usage section index', async ({ page }) => {
    await page.goto('/usage')
    await page.waitForTimeout(1000)
    await expect(page).toHaveScreenshot('usage-dark.png', { fullPage: true })
  })

  test('guidelines doc page', async ({ page }) => {
    await page.goto('/guidelines/testing/test-pyramid')
    await page.waitForTimeout(1000)
    await expect(page).toHaveScreenshot('doc-page-dark.png', { fullPage: true })
  })

  test('contributors', async ({ page }) => {
    await page.goto('/contributors')
    await page.waitForTimeout(1000)
    await expect(page).toHaveScreenshot('contributors-dark.png', { fullPage: true })
  })

  test('getting started', async ({ page }) => {
    await page.goto('/getting-started')
    await page.waitForTimeout(1000)
    await expect(page).toHaveScreenshot('getting-started-dark.png', { fullPage: true })
  })
})

test.describe('Visual regression — light mode', () => {
  test.use({ colorScheme: 'light' })

  test('homepage light', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(1000)
    await expect(page).toHaveScreenshot('homepage-light.png', { fullPage: true })
  })
})
