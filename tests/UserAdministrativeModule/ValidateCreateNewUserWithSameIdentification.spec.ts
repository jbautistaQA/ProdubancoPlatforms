import { AdministrativeModulePage } from "../../PageObjects/Maintenance/AdministrativeModule/AdministrativeModulePage";
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';

test.describe('Validate response when trying to create with an already created identification', () => {
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
        // Eliminar el usuario creado para limpiar el entorno
        await administrativeModulePage.searchUser("anonimo03");
        await administrativeModulePage.clickOnSearchButton();
        await administrativeModulePage.inputConfirmationPassword('123');
        await administrativeModulePage.clickOnDeleteUserButton();
        await administrativeModulePage.clickConfirmCreationButton();
        await administrativeModulePage.validateSuccessfulUserDeletionMessage('usuario: ANONIMO03 eliminado exitosamente.');
        // Cerrar sesión
        await homePage.clickOnUsersTab();
        await homePage.clickOnLogoutButton();
        await expect(page).toHaveURL(LoginPage.LOGIN_URL);
    });

    test('User tries to create a user with an already registered identification', async ({ page }) => {
        await homePage.clickOnMaintenanceTab();
        await homePage.clickOnMaintenanceUsersTab();
        await homePage.clickOnAdministrativeModule();
        await expect(page).toHaveURL(AdministrativeModulePage.ADMINISTRATIVEMODULE_URL);

        // Crear primer usuario
        await administrativeModulePage.inputUserName('anonimo03');
        await administrativeModulePage.inputFirstname('Jesus');
        await administrativeModulePage.inputMiddlename('M.');
        await administrativeModulePage.inputLastname('Bautista');
        await administrativeModulePage.inputSecondLastname('D.');
        await administrativeModulePage.selectStatus('A:Activo');
        await administrativeModulePage.selectOperationalRole('Usuario');
        await administrativeModulePage.selectTransmitter('NOVOPAYMENT');
        await administrativeModulePage.inputCharge('Analista Senior QA');
        await administrativeModulePage.selectIdentificationType('CC');
        await administrativeModulePage.inputIdentificationNumber('0912345675');
        await administrativeModulePage.inputEmail('anonimo03@yopmail.com');
        await administrativeModulePage.inputPositionArea('QA');
        await administrativeModulePage.inputPhoneNumber('0987654321');
        await administrativeModulePage.inputConfirmationPassword('123');
        await administrativeModulePage.clickInsertButton();
        await administrativeModulePage.clickConfirmCreationButton();
        await administrativeModulePage.validateSuccessfulUserCreationMessage('tu transacci?n ha sido procesada exitosamente.');

        // Intentar crear segundo usuario con la misma identificación
        await administrativeModulePage.inputUserName('anonimo04');
        await administrativeModulePage.inputFirstname('Jesus');
        await administrativeModulePage.inputMiddlename('M.');
        await administrativeModulePage.inputLastname('Bautista');
        await administrativeModulePage.inputSecondLastname('D.');
        await administrativeModulePage.selectStatus('A:Activo');
        await administrativeModulePage.selectOperationalRole('Usuario');
        await administrativeModulePage.selectTransmitter('NOVOPAYMENT');
        await administrativeModulePage.inputCharge('Analista Senior QA');
        await administrativeModulePage.selectIdentificationType('CC');
        await administrativeModulePage.inputIdentificationNumber('0912345675');
        await administrativeModulePage.inputEmail('anonimo04@yopmail.com');
        await administrativeModulePage.inputPositionArea('QA');
        await administrativeModulePage.inputPhoneNumber('0987654321');
        await administrativeModulePage.inputConfirmationPassword('123');
        await administrativeModulePage.clickInsertButton();
        await administrativeModulePage.clickConfirmCreationButton();
        await administrativeModulePage.validateExistingIdentificationMessage('el nro. de identificaci�n 0912345675. Ya se encuentra registrado.');
    });
});