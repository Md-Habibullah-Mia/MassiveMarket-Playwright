import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('Smoke - Login', () => {

  test('TC-002 - Successful login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();

    await loginPage.login(
      process.env.LOGIN_TEST_EMAIL!,
      process.env.LOGIN_TEST_PASSWORD!
    );

    await dashboardPage.verifyDashboardLoaded();
  });

});