import { test, expect } from '@playwright/test';
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import { ChangePasswordPage } from '../../PageObjects/ChangePassword/ChangePasswordPage';


test.describe('Validate Change Password Without enter a new password', () => {
    test.skip('User enters correct credentials and logs in to his account', async ({ page }) => {
        await test.step('I navigate to Produbanco´s administrative module page', async () => {
            await page.goto(LoginPage.LOGIN_URL);
        })
        await test.step('Enter valid username and password to log into the system.', async () => {
            const loginPage = new LoginPage(page);

            await loginPage.inputUsername('JBAU89');
            await loginPage.inputPassword('123');
            await loginPage.clickLoginButton();
        })

        await test.step('Valid that you have logged in to the portal in a satisfactory manner', async () => {
            await expect(page).toHaveURL(LoginPage.DASHBOARD_URL);
        });

        await test.step('Enter on the password change section', async () => {
            const homePage = new HomePage(page);
            await homePage.clickOnUsersTab();
            await homePage.clickOnChangePassword();
            await expect(page).toHaveURL(ChangePasswordPage.CHANGEPASSWORD_URL);
        })

        await test.step('Validate accept button without entering the new password', async () => {
            const changePasswordPage = new ChangePasswordPage(page);
            await changePasswordPage.setCurrentPassword('123');
            await changePasswordPage.clickAcceptButton()
            await changePasswordPage.validateAcceptButtonDisabled()
        })

        await test.step('Validate log out of the system', async () => {
            const changePasswordPage = new ChangePasswordPage(page);
            const homePage = new HomePage(page);
            await changePasswordPage.clickBackButton()
            await homePage.clickOnUsersTab();
            await homePage.clickOnLogoutButton();
            await expect(page).toHaveURL(LoginPage.LOGIN_URL);

        })

    })
});


