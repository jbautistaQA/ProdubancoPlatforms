import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    static create(page: Page) {
        return new LoginPage(page);
    }
    static LOGIN_PATH =
        "/admnovoWebProd/loginSetup.do?trnid=login&opcion=3"
    static LOGIN_URL =
        "https://tomcat-t-ecuador-server.novopayment.net/admnovoWebProd/loginSetup.do?trnid=login&opcion=3";
    static DASHBOARD_URL =
        "https://tomcat-t-ecuador-server.novopayment.net/admnovoWebProd/login.do";
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly cancelButton: Locator;
    readonly validateFieldColor: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByRole("textbox", { name: "Usuario" });
        this.passwordField = page.getByRole("textbox", { name: "Contraseña" });
        this.loginButton = page.getByRole("button", { name: "Ingresar" });
        this.cancelButton = page.getByRole("button", { name: "Cancelar" });
    }

    async inputUsername(username: string) {
        await this.usernameField.fill(username);
    }

    async inputPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async validateErrorLoginMessage(message: string) {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async validateEmptyUsernameField() {
        await expect(this.usernameField).toBeEmpty();
    }

    async validateEmptyPasswordField() {
        await expect(this.passwordField).toBeEmpty();
    }
}

