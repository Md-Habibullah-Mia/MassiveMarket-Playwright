import { expect, Page, Locator } from '@playwright/test';

export class RegistrationPage {
  private readonly firstName: Locator;
  private readonly middleName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly phone: Locator;
  private readonly referralCode: Locator;
  private readonly password: Locator;
  private readonly confirmPassword: Locator;
  private readonly termsCheckbox: Locator;
  private readonly createAccountButton: Locator;

  constructor(private readonly page: Page) {
    this.firstName = this.page.getByPlaceholder('Rohan', {
      exact: true,
    });

    this.middleName = this.page.getByPlaceholder('Optional', {
      exact: true,
    });

    this.lastName = this.page.getByPlaceholder('Iban', {
      exact: true,
    });

    this.email = this.page.locator('input[type="email"]');

    this.phone = this.page.locator('input[type="tel"]');

    this.referralCode = this.page.getByPlaceholder(
      'Code from your referrer',
      {
        exact: true,
      }
    );

    this.password = this.page
      .locator('input[type="password"]')
      .nth(0);

    this.confirmPassword = this.page
      .locator('input[type="password"]')
      .nth(1);

    this.termsCheckbox = this.page.getByRole('checkbox', {
      name: /terms of service and privacy policy/i,
    });

    this.createAccountButton = this.page.getByRole('button', {
      name: 'Create Account',
    });
  }

  async goto() {
    await this.page.goto('/auth/sign-up', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    await expect(this.createAccountButton).toBeVisible({
      timeout: 10000,
    });
  }

  /**
   * Types into a field using pressSequentially to properly trigger
   * React's synthetic events on controlled inputs.
   */
  private async typeIntoField(locator: Locator, value: string) {
    await locator.click();
    await locator.clear();
    await locator.pressSequentially(value, { delay: 40 });
  }

  async register(data: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone: string;
    referralCode?: string;
    password: string;
    confirmPassword?: string;
  }) {
    // First Name
    await this.firstName.waitFor({ state: 'visible' });
    await expect(this.firstName).toBeEditable();
    await this.typeIntoField(this.firstName, data.firstName);
    await expect(this.firstName).toHaveValue(data.firstName);

    // Middle Name
    if (data.middleName) {
      await this.typeIntoField(this.middleName, data.middleName);
    }

    // Last Name
    await this.typeIntoField(this.lastName, data.lastName);

    // Email
    await this.typeIntoField(this.email, data.email);

    // Phone
    await this.typeIntoField(this.phone, data.phone);

    // Referral Code
    if (data.referralCode) {
      await this.typeIntoField(this.referralCode, data.referralCode);
    }

    // Password
    await this.typeIntoField(this.password, data.password);

    // Confirm Password
    await this.typeIntoField(
      this.confirmPassword,
      data.confirmPassword ?? data.password
    );

    // Terms & Privacy Policy
    await this.termsCheckbox.check();

    // Create Account
    await expect(this.createAccountButton).toBeEnabled({
      timeout: 10000,
    });

    await this.createAccountButton.click();
  }
}