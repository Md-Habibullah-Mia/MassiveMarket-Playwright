import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run independent tests in parallel
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // Use a single worker in CI for stability
  workers: process.env.CI ? 1 : undefined,

  // HTML report
  reporter: 'html',

  use: {
    // MassiveMarket application
    baseURL: 'http://16.171.110.244',

    // Application test-id attribute
    testIdAttribute: 'data-testid',

    // Capture trace when a test is retried
    trace: 'on-first-retry',

    // Capture screenshot only when test fails
    screenshot: 'only-on-failure',

    // Record video only when test fails
    video: 'retain-on-failure',

    // Keep browser actions visible during debugging
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});