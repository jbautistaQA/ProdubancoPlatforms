import { OnlineCompaniesPage } from '../../PageObjects/Maintenance/OnlineCompanies/OnlineCompaniesPage';
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';
import { RelationshipUserCompanyPage } from '../../PageObjects/Maintenance/OnlineCompanies/RelationshipUserCompanyPage';

test.describe('Validate invalid and empty confirmation password in relationship user company', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let onlineCompaniesPage: OnlineCompaniesPage;
    let relationshipUserCompanyPage: RelationshipUserCompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        onlineCompaniesPage = new OnlineCompaniesPage(page);
        relationshipUserCompanyPage = new RelationshipUserCompanyPage(page);

        await page.goto(LoginPage.LOGIN_PATH);
        await loginPage.inputUsername(users.admin6.username);
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

    test('User creates a new CEO user and input invalid password and empty confirmation password in the relationship user company', async ({ page }) => {
        await homePage.clickOnMaintenanceTab();
        await homePage.clickOnMaintenanceUsersTab();
        await homePage.clickOnOnlineCompaniesTab();
        await expect(page).toHaveURL(OnlineCompaniesPage.ONLINECOMPANIES_URL);

        await onlineCompaniesPage.inputUsername('AUTCEO06')
        await onlineCompaniesPage.inputPhoneNumber('0987654321');
        await onlineCompaniesPage.selectIdentificationType('CC');
        await onlineCompaniesPage.inputIdentificationNumber('2069186100');
        await onlineCompaniesPage.inputFirstName('JOHN6');
        await onlineCompaniesPage.inputMiddlename('DOE6');
        await onlineCompaniesPage.inputLastname('SMITH6');
        await onlineCompaniesPage.inputSecondLastname('JOHNSON6');
        await onlineCompaniesPage.inputCharge('CEO');
        await onlineCompaniesPage.inputPositionArea('MANAGEMENT');
        await onlineCompaniesPage.inputEmail('JOHNSMITH6@YOPMAIL.COM');
        await onlineCompaniesPage.selectStatus('ACTIVO');
        await onlineCompaniesPage.selectSignatureGroup('GRUPO 1 FIRMA');
        await onlineCompaniesPage.inputConfirmationPassword('123');
        await onlineCompaniesPage.clickInsertButton()
        await onlineCompaniesPage.clickConfirmCreationButton();
        await onlineCompaniesPage.validateConfirmCreationMessage('tu transaccion ha sido procesada exitosamente.');
        await onlineCompaniesPage.inputConfirmationPassword('123');

        //Validar con contraseña vacia
        await onlineCompaniesPage.clickAddCompanyButton();
        await relationshipUserCompanyPage.inputPassword('');
        await relationshipUserCompanyPage.clickUpdateButton();
        await relationshipUserCompanyPage.validateEmptyConfirmationPasswordMessage('Debe ingresar su clave de confirmaci&oacute;n.');
        await relationshipUserCompanyPage.clickCorrectButton();


        //Validar con contraseña invalida
        await relationshipUserCompanyPage.inputPassword('invalidPassword');
        await relationshipUserCompanyPage.clickUpdateButton();
        await relationshipUserCompanyPage.validateInvalidPasswordMessage('La contrase&ntilde;a ingresada es incorrecta.');
        await relationshipUserCompanyPage.clickCorrectButton();
    });
});