import { test } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('Smoke - Registration', () => {

  test('TC-001 - Successful registration with valid data', async ({ page }) => {
    test.setTimeout(60_000);

    const registrationPage = new RegistrationPage(page);
    const dashboardPage = new DashboardPage(page);

    const uniqueEmail = `qa_${Date.now()}@test.com`;

    await registrationPage.goto();

    await registrationPage.register({
      firstName: 'QA',
      middleName: 'Automation',
      lastName: 'Tester',
      email: uniqueEmail,
      phone: process.env.TEST_PHONE!,
      password: process.env.REGISTRATION_TEST_PASSWORD!,
    });

    await dashboardPage.verifyDashboardLoaded();
    });

});