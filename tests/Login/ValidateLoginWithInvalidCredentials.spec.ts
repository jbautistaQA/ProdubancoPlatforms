import { LoginPage } from "../../PageObjects/Login/LoginPage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';

test.describe('Validate response when clearing the data entered in the form', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = LoginPage.create(page);
        await page.goto(LoginPage.LOGIN_PATH);
        await loginPage.inputUsername(users.invalidCredentials.username);
        await loginPage.inputPassword(users.invalidCredentials.password);
        await loginPage.clickLoginButton();
    });

    test('Create the user and edit it', async ({ page }) => {
        await loginPage.validateErrorLoginMessage('Usuario o contraseña inválido.')
    });
});