import { AdministrativeModulePage } from "../../PageObjects/Maintenance/AdministrativeModule/AdministrativeModulePage";
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';

test.describe('Validate response when editing a user', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let administrativeModulePage: AdministrativeModulePage;

    test.beforeEach(async ({ page }) => {
        loginPage = LoginPage.create(page);
        homePage = HomePage.create(page);
        administrativeModulePage = AdministrativeModulePage.create(page);

        await page.goto(LoginPage.LOGIN_PATH);
        await loginPage.inputUsername(users.admin7.username);
        await loginPage.inputPassword(users.globalPassword.password);
        await loginPage.clickLoginButton();
        await expect(page).toHaveURL(LoginPage.DASHBOARD_URL);
    });

    test.afterEach(async ({ page }) => {
        // Eliminar el usuario creado para limpiar el entorno
        await administrativeModulePage.searchUser("anonimo06");
        await administrativeModulePage.clickOnSearchButton();
        await administrativeModulePage.inputConfirmationPassword('123');
        await administrativeModulePage.clickOnDeleteUserButton();
        await administrativeModulePage.clickConfirmCreationButton();
        await administrativeModulePage.validateSuccessfulUserDeletionMessage('usuario: ANONIMO06 eliminado exitosamente.');
        // Cerrar sesión
        await homePage.clickOnUsersTab();
        await homePage.clickOnLogoutButton();
        await expect(page).toHaveURL(LoginPage.LOGIN_URL);
    });

    test('User search a user and edit the information', async ({ page }) => {
        await homePage.clickOnMaintenanceTab();
        await homePage.clickOnMaintenanceUsersTab();
        await homePage.clickOnAdministrativeModule();
        await expect(page).toHaveURL(AdministrativeModulePage.ADMINISTRATIVEMODULE_URL);

        await administrativeModulePage.inputUserName('anonimo06');
        await administrativeModulePage.inputFirstname('Jesus');
        await administrativeModulePage.inputMiddlename('M.');
        await administrativeModulePage.inputLastname('Bautista');
        await administrativeModulePage.inputSecondLastname('D.');
        await administrativeModulePage.selectStatus('A:Activo');
        await administrativeModulePage.selectOperationalRole('Usuario');
        await administrativeModulePage.selectTransmitter('NOVOPAYMENT');
        await administrativeModulePage.inputCharge('Analista Junior QA');
        await administrativeModulePage.selectIdentificationType('CC');
        await administrativeModulePage.inputIdentificationNumber('0998048409');
        await administrativeModulePage.inputEmail('anonimo06@yopmail.com');
        await administrativeModulePage.inputPositionArea('QA');
        await administrativeModulePage.inputPhoneNumber('0987654321');
        await administrativeModulePage.inputConfirmationPassword('123');
        await administrativeModulePage.clickInsertButton();
        await administrativeModulePage.clickConfirmCreationButton();
        await administrativeModulePage.validateSuccessfulUserCreationMessage('tu transacci?n ha sido procesada exitosamente.')

        await administrativeModulePage.searchUser("anonimo06");
        await administrativeModulePage.clickOnSearchButton();

        await administrativeModulePage.validateTableRow([
            "ANONIMO06",
            "Jesus",
            "Bautista",
            "0998048409",
            "A",
            "U",
            "NOVOPAYMENT",
            "QA",
            "Analista Junior QA",
            "0987654321",
            "CC"
        ]);

        await administrativeModulePage.clickOnEditUserButton();
        await administrativeModulePage.inputFirstname('Carlos');
        await administrativeModulePage.inputLastname('Hernandez');
        await administrativeModulePage.inputCharge('Administrador');
        await administrativeModulePage.inputPositionArea('Contador');
        await administrativeModulePage.inputPhoneNumber('0966789012');

        await administrativeModulePage.searchUser("anonimo06");
        await administrativeModulePage.inputConfirmationPassword('123');
        await administrativeModulePage.clickOnUpdateButton();
        await administrativeModulePage.clickConfirmCreationButton();
        await administrativeModulePage.validateSuccessfulUserEditationMessage('tu transacci�n ha sido procesada exitosamente.')

        await administrativeModulePage.searchUser("anonimo06");
        await administrativeModulePage.clickOnSearchButton();
        await administrativeModulePage.validateTableRow([
            "ANONIMO06",
            "Carlos",
            "Hernandez",
            "0998048409",
            "A",
            "U",
            "NOVOPAYMENT",
            "Contador",
            "Administrador",
            "0966789012",
            "CC"
        ]);
    });
});