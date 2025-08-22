import { OnlineCompaniesPage } from '../../PageObjects/Maintenance/OnlineCompanies/OnlineCompaniesPage';
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';

test.describe('Validate edit CEO user', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let onlineCompaniesPage: OnlineCompaniesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        onlineCompaniesPage = new OnlineCompaniesPage(page);

        await page.goto(LoginPage.LOGIN_PATH);
        await loginPage.inputUsername(users.admin2.username);
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

    test('User creates a new CEO user and edit it', async ({ page }) => {
        await homePage.clickOnMaintenanceTab();
        await homePage.clickOnMaintenanceUsersTab();
        await homePage.clickOnOnlineCompaniesTab();
        await expect(page).toHaveURL(OnlineCompaniesPage.ONLINECOMPANIES_URL);

        await onlineCompaniesPage.inputUsername('AUTCEO02')
        await onlineCompaniesPage.inputPhoneNumber('0987654321');
        await onlineCompaniesPage.selectIdentificationType('CC');
        await onlineCompaniesPage.inputIdentificationNumber('0132158783');
        await onlineCompaniesPage.inputFirstName('JOHN2');
        await onlineCompaniesPage.inputMiddlename('DOE2');
        await onlineCompaniesPage.inputLastname('SMITH2');
        await onlineCompaniesPage.inputSecondLastname('JOHNSON2');
        await onlineCompaniesPage.inputCharge('CEO');
        await onlineCompaniesPage.inputPositionArea('MANAGEMENT');
        await onlineCompaniesPage.inputEmail('JOHNSMITH2@YOPMAIL.COM');
        await onlineCompaniesPage.selectStatus('ACTIVO');
        await onlineCompaniesPage.selectSignatureGroup('GRUPO 1 FIRMA');
        await onlineCompaniesPage.inputConfirmationPassword('123');
        await onlineCompaniesPage.clickInsertButton()
        await onlineCompaniesPage.clickConfirmCreationButton();
        await onlineCompaniesPage.validateConfirmCreationMessage('tu transaccion ha sido procesada exitosamente.');
        await onlineCompaniesPage.validateTableRow(
            'AUTCEO02',
            'JOHN2 SMITH2',
            'JOHNSMITH2@YOPMAIL.COM',
            'A'
        );
        await onlineCompaniesPage.clickEditUserButton();
        await onlineCompaniesPage.inputPhoneNumber('0999874545');
        await onlineCompaniesPage.inputFirstName('EDIT JOHN2');
        await onlineCompaniesPage.inputMiddlename('EDIT DOE2');
        await onlineCompaniesPage.inputLastname('EDIT SMITH2');
        await onlineCompaniesPage.inputSecondLastname('EDIT JOHNSON2');
        await onlineCompaniesPage.inputCharge('EDIT CEO');
        await onlineCompaniesPage.inputPositionArea('EDIT MANAGEMENT');
        await onlineCompaniesPage.inputEmail('EDITJOHNSMITH2@YOPMAIL.COM');
        await onlineCompaniesPage.selectStatus('SUSPENDIDO');
        await onlineCompaniesPage.selectSignatureGroup('GRUPO 2 FIRMAS');
        await onlineCompaniesPage.inputConfirmationPassword('123');
        await onlineCompaniesPage.clickUpdateButton()
        await onlineCompaniesPage.clickConfirmCreationButton();
        await onlineCompaniesPage.validateConfirmUpdateMessage('usuario: AUTCEO02 modificado exitosamente.');
        await onlineCompaniesPage.validateTableRow(
            'AUTCEO02',
            'EDIT JOHN2 EDIT SMITH2',
            'EDITJOHNSMITH2@YOPMAIL.COM',
            'S'
        );
    });
});