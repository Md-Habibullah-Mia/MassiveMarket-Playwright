import { test } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';

test.describe('Smoke - Registration', () => {

  test('TC-001 - Successful registration with valid data', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);

    const uniqueEmail = `qa_${Date.now()}@example.com`;

    await registrationPage.goto();

    await registrationPage.register({
      firstName: 'QA',
      middleName: 'Automation',
      lastName: 'Tester',
      email: uniqueEmail,
      phone: '+17365632445',
      password: 'Test@12345',
    });

    // TODO:
    // Add the exact post-registration success assertion
    // after confirming the actual application response.
  });

});