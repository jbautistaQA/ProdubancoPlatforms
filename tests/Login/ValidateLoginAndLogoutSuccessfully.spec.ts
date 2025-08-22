import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';

test.describe('Validate response when clearing the data entered in the form', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = LoginPage.create(page);
        homePage = HomePage.create(page);
        await page.goto(LoginPage.LOGIN_PATH);
    });

    test('Create the user and edit it', async ({ page }) => {
        await loginPage.inputUsername(users.admin1.username);
        await loginPage.inputPassword(users.globalPassword.password);
        await loginPage.clickLoginButton();
        await expect(page).toHaveURL(LoginPage.DASHBOARD_URL);

        await homePage.clickOnUsersTab();
        await homePage.clickOnLogoutButton();
        await expect(page).toHaveURL(LoginPage.LOGIN_URL);
    });
});