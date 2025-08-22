import { AdministrativeModulePage } from "../../PageObjects/Maintenance/AdministrativeModule/AdministrativeModulePage";
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';

test.describe('Validate response when trying to create with an invalid identification number', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let administrativeModulePage: AdministrativeModulePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        administrativeModulePage = new AdministrativeModulePage(page);

        await page.goto(LoginPage.LOGIN_PATH);
        await loginPage.inputUsername(users.admin4.username);
        await loginPage.inputPassword(users.globalPassword.password);
        await loginPage.clickLoginButton();
        await expect(page).toHaveURL(LoginPage.DASHBOARD_URL);
    });

    test.afterEach(async ({ page }) => {
        // Cerrar sesión
        await homePage.clickOnUsersTab();
        await homePage.clickOnLogoutButton();
        await expect(page).toHaveURL(LoginPage.LOGIN_URL);
    });

    test('User tries to create a user with an invalid identification number', async ({ page }) => {
        await homePage.clickOnMaintenanceTab();
        await homePage.clickOnMaintenanceUsersTab();
        await homePage.clickOnAdministrativeModule();
        await expect(page).toHaveURL(AdministrativeModulePage.ADMINISTRATIVEMODULE_URL);

        // Crear primer usuario
        await administrativeModulePage.inputUserName('anonimo09');
        await administrativeModulePage.inputFirstname('Jesus');
        await administrativeModulePage.inputMiddlename('M.');
        await administrativeModulePage.inputLastname('Bautista');
        await administrativeModulePage.inputSecondLastname('D.');
        await administrativeModulePage.selectStatus('A:Activo');
        await administrativeModulePage.selectOperationalRole('Usuario');
        await administrativeModulePage.selectTransmitter('NOVOPAYMENT');
        await administrativeModulePage.inputCharge('Analista Senior QA');
        await administrativeModulePage.selectIdentificationType('CC');
        await administrativeModulePage.inputIdentificationNumber('8956464604');
        await administrativeModulePage.inputEmail('anonimo09@yopmail.com');
        await administrativeModulePage.inputPositionArea('QA');
        await administrativeModulePage.inputPhoneNumber('0987654321');
        await administrativeModulePage.inputConfirmationPassword('123');
        await administrativeModulePage.clickInsertButton();
        await administrativeModulePage.clickConfirmCreationButton();
        await administrativeModulePage.validateInvalidIdentificacionNumberMessage('el n�mero de identificaci�n 8956464604 es inv�lido.');
    });
});