import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dashboardHeading = page.getByRole('heading', {
      name: /dashboard/i,
    });
  }

  async goto() {
    await this.page.goto('/me/dashboard');
  }

  async verifyDashboardLoaded() {
    await expect(this.page).toHaveURL(/\/me\/dashboard/);
    await expect(this.dashboardHeading).toBeVisible();
  }
}