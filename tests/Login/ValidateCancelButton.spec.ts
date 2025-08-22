import { LoginPage } from "../../PageObjects/Login/LoginPage";
import users from '../../setup/credentials.json';
import { test } from '@playwright/test';

test.describe('Validate response when clearing the data entered in the form', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = LoginPage.create(page);
        await page.goto(LoginPage.LOGIN_PATH);
        await loginPage.inputUsername(users.admin1.username);
        await loginPage.inputPassword(users.globalPassword.password);
        await loginPage.clickCancelButton();

    });

    test('Create the user and edit it', async () => {
        await loginPage.validateEmptyUsernameField();
        await loginPage.validateEmptyPasswordField();
    });
});