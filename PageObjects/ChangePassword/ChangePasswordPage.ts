import { expect, type Locator, type Page } from '@playwright/test';

export class ChangePasswordPage {
    readonly page: Page;
    static create(page: Page) {
        return new ChangePasswordPage(page);
    }
    static CHANGEPASSWORD_URL = 'https://tomcat-t-ecuador-server.novopayment.net/admnovoWebProd/cambioClave.do';
    readonly currentPassword: Locator;
    readonly newPassword: Locator;
    readonly confirmNewPassword: Locator;
    readonly acceptButton: Locator;
    readonly backButton: Locator;
    readonly confirmChangePassword: Locator;
    readonly invalidCurrentPasswordMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.currentPassword = page.locator('#curpw');
        this.newPassword = page.locator('#newpw');
        this.confirmNewPassword = page.locator('#newpwcf');
        this.acceptButton = page.getByRole('button', { name: 'Aceptar' })
        this.backButton = page.getByRole('button', { name: 'Atrás' });
        this.confirmChangePassword = page.getByRole('button', { name: 'SI' })
    }

    async setCurrentPassword(currentPassword: string) {
        await this.currentPassword.fill(currentPassword);
    }

    async setNewPassword(newPassword: string) {
        await this.newPassword.fill(newPassword);
    }

    async setConfirmNewPassword(confirmNewPassword: string) {
        await this.confirmNewPassword.fill(confirmNewPassword);
    }

    async clickAcceptButton() {
        await this.acceptButton.click();
    }

    async clickBackButton() {
        await this.backButton.click();
    }

    async clickConfrimChangePassword() {
        await this.confirmChangePassword.click()
    }

    async validateInvalidCurrentPasswordMessage(message: string) {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async validateAcceptButtonDisabled() {
        await expect(this.acceptButton).toBeDisabled();
    }
}












