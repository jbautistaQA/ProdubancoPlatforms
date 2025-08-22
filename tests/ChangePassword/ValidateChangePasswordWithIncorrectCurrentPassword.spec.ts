import { test, expect } from '@playwright/test';
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import { ChangePasswordPage } from '../../PageObjects/ChangePassword/ChangePasswordPage';

test.describe('Validate Change Password With Incorrect Current Password', () => {
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

        await test.step('Enter the current invalid password and perform the process.', async () => {
            const changePasswordPage = new ChangePasswordPage(page);
            await changePasswordPage.setCurrentPassword('665');
            await changePasswordPage.setNewPassword('Novotest123.');
            await changePasswordPage.setConfirmNewPassword('Novotest123.')
            await changePasswordPage.clickAcceptButton()
            await changePasswordPage.clickConfrimChangePassword()
            await changePasswordPage.validateInvalidCurrentPasswordMessage('clave actual es inv�lida.') //Todo: error en el mensaje de error se reporta ticket
        })

        await test.step('Validate log out of the system', async () => {
            const changePasswordPage = new ChangePasswordPage(page);
            const homePage = new HomePage(page);
            await changePasswordPage.clickBackButton()
            await changePasswordPage.clickBackButton()
            await homePage.clickOnUsersTab();
            await homePage.clickOnLogoutButton();
            await expect(page).toHaveURL(LoginPage.LOGIN_URL);

        })

    })
});


