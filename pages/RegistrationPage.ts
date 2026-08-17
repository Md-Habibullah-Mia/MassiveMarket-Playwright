import { expect, Page } from '@playwright/test';

export class RegistrationPage {
  constructor(private readonly page: Page) {}

  private firstName = this.page.locator('input[placeholder="Rohan"]');
  private middleName = this.page.locator('input[placeholder="Optional"]');
  private lastName = this.page.locator('input[placeholder="Iban"]');
  private email = this.page.locator('input[type="email"]');
  private phone = this.page.locator('input[type="tel"]');
  private referralCode = this.page.locator(
    'input[placeholder="Code from your referrer"]'
  );
  private password = this.page.locator('input[type="password"]').nth(0);
  private confirmPassword = this.page.locator('input[type="password"]').nth(1);

  private termsCheckbox = this.page.getByRole('checkbox', {
    name: /terms of service and privacy policy/i,
  });

  private createAccountButton = this.page.getByRole('button', {
    name: 'Create Account',
  });

  async goto() {
    await this.page.goto('/auth/sign-up');
    await expect(this.createAccountButton).toBeVisible();
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
    await this.firstName.fill(data.firstName);

    if (data.middleName) {
      await this.middleName.fill(data.middleName);
    }

    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.phone.fill(data.phone);

    if (data.referralCode) {
      await this.referralCode.fill(data.referralCode);
    }

    await this.password.fill(data.password);

    await this.confirmPassword.fill(
      data.confirmPassword ?? data.password
    );

    await this.termsCheckbox.check();

    await expect(this.createAccountButton).toBeEnabled();

    await this.createAccountButton.click();
  }
}