import { expect, Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.email = this.page.locator('input[type="email"]');
    this.password = this.page.locator('input[type="password"]');

    this.loginButton = this.page.getByRole('button', {
      name: 'Log In',
    });
  }

  async goto() {
    await this.page.goto('/auth/sign-in');
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);

    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.click();
  }
}