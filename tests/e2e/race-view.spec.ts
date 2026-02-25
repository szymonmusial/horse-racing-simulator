import { expect, test, type Page } from '@playwright/test'

const generateProgram = async (page: Page) => {
  await page.getByRole('button', { name: 'Generate' }).click()
}

const startRace = async (page: Page) => {
  await page.getByRole('button', { name: 'Start' }).click()
}

const getHorseLeftPercent = async (page: Page): Promise<number> => {
  const style = (await page.locator('[data-test="race-track-horse"]').first().getAttribute('style')) ?? ''
  const match = style.match(/left:\s*([\d.]+)%/)
  return match ? Number(match[1]) : 0
}

test.describe('Race view', () => {
  test.setTimeout(120_000)

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows initial empty state before user generates program', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Horse Racing Simulator' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Generate' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Start' })).toBeDisabled()
    await expect(page.locator('[data-test="race-track-panel"]')).toContainText('No race in progress')
    await expect(page.locator('[data-test="race-results-panel"]')).toContainText('No round results')
    await expect(page.locator('[data-test="race-program-panel"]')).toContainText('No rounds generated')
  })

  test('generates a complete race program after clicking Generate', async ({ page }) => {
    await generateProgram(page)

    await expect(page.getByRole('button', { name: 'Start' })).toBeEnabled()
    await expect(page.locator('[data-test="horse-card"]')).toHaveCount(20)
    await expect(page.locator('[data-test="round-program"]')).toHaveCount(6)

    const rounds = page.locator('[data-test="round-program"]')
    for (let i = 0; i < 6; i++) {
      await expect(rounds.nth(i).locator('[data-test="horse-identity"]')).toHaveCount(10)
    }

    const programPanel = page.locator('[data-test="race-program-panel"]')
    await expect(programPanel).toContainText('1200 m')
    await expect(programPanel).toContainText('1400 m')
    await expect(programPanel).toContainText('1600 m')
    await expect(programPanel).toContainText('1800 m')
    await expect(programPanel).toContainText('2000 m')
    await expect(programPanel).toContainText('2200 m')
  })

  test('starts race and visibly animates horse movement', async ({ page }) => {
    await generateProgram(page)
    await startRace(page)

    await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible()
    await expect(page.locator('[data-test="race-preview"]')).toBeVisible()
    await expect(page.locator('[data-test="race-track"]')).toHaveCount(10)

    await expect(page.locator('[data-test="race-track-horse"]').first()).toBeVisible()
    const initialLeft = await getHorseLeftPercent(page)

    await expect.poll(async () => getHorseLeftPercent(page), { timeout: 12_000 }).toBeGreaterThan(initialLeft)
  })

  test('updates results table sequentially as rounds finish', async ({ page }) => {
    await generateProgram(page)
    await startRace(page)

    const summaries = page.locator('[data-test="round-summary"]')
    const resultsPanel = page.locator('[data-test="race-results-panel"]')
    await expect(resultsPanel).toContainText('No round results')
    await expect(summaries).toHaveCount(0)

    await expect(summaries).toHaveCount(1, { timeout: 25_000 })
    await expect(resultsPanel).not.toContainText('No round results')
    await expect(summaries.first()).toContainText('Round 1')
    await expect(page.locator('[data-test="race-preview"] h2')).toContainText('Round 2', { timeout: 15_000 })
    await expect(summaries).toHaveCount(2, { timeout: 30_000 })
    await expect(summaries.nth(1)).toContainText('Round 2')

    await expect(summaries.first().locator('[data-test="round-result"]')).toHaveCount(10)
  })

  test('allows user to pause and resume the race', async ({ page }) => {
    await generateProgram(page)
    await startRace(page)

    const horse = page.locator('[data-test="race-track-horse"]').first()
    await expect(horse).toBeVisible()

    await page.getByRole('button', { name: 'Pause' }).click()
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Pause' })).toHaveCount(0)

    const pausedStyle = await horse.getAttribute('style')
    await page.getByRole('button', { name: 'Start' }).click()

    await expect.poll(async () => horse.getAttribute('style'), { timeout: 12_000 }).not.toBe(pausedStyle)
  })

  test('resets active race and results when user generates again', async ({ page }) => {
    await generateProgram(page)
    await startRace(page)

    await expect(page.locator('[data-test="round-summary"]')).toHaveCount(1, { timeout: 25_000 })

    await generateProgram(page)

    await expect(page.getByRole('button', { name: 'Start' })).toBeEnabled()
    await expect(page.locator('[data-test="race-track-panel"]')).toContainText('No race in progress')
    await expect(page.locator('[data-test="race-results-panel"]')).toContainText('No round results')
    await expect(page.locator('[data-test="round-program"]')).toHaveCount(6)
  })
})
