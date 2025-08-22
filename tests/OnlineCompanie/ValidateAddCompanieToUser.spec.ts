import { OnlineCompaniesPage } from '../../PageObjects/Maintenance/OnlineCompanies/OnlineCompaniesPage';
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';
import { RelationshipUserCompanyPage } from '../../PageObjects/Maintenance/OnlineCompanies/RelationshipUserCompanyPage';

test.describe('Validate add companie to user', () => {
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

        await loginPage.inputUsername(users.admin5.username);
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

    test('User creates a new CEO user and add companie to him', async ({ page }) => {

        await homePage.clickOnMaintenanceTab();
        await homePage.clickOnMaintenanceUsersTab();
        await homePage.clickOnOnlineCompaniesTab();
        await expect(page).toHaveURL(OnlineCompaniesPage.ONLINECOMPANIES_URL);

        await onlineCompaniesPage.inputUsername('AUTCEO05')
        await onlineCompaniesPage.inputPhoneNumber('0987654321');
        await onlineCompaniesPage.selectIdentificationType('CC');
        await onlineCompaniesPage.inputIdentificationNumber('1985435294');
        await onlineCompaniesPage.inputFirstName('JOHN5');
        await onlineCompaniesPage.inputMiddlename('DOE5');
        await onlineCompaniesPage.inputLastname('SMITH5');
        await onlineCompaniesPage.inputSecondLastname('JOHNSON5');
        await onlineCompaniesPage.inputCharge('CEO');
        await onlineCompaniesPage.inputPositionArea('MANAGEMENT');
        await onlineCompaniesPage.inputEmail('JOHNSMITH5@YOPMAIL.COM');
        await onlineCompaniesPage.selectStatus('ACTIVO');
        await onlineCompaniesPage.selectSignatureGroup('GRUPO 1 FIRMA');
        await onlineCompaniesPage.inputConfirmationPassword('123');
        await onlineCompaniesPage.clickInsertButton()
        await onlineCompaniesPage.clickConfirmCreationButton();
        await onlineCompaniesPage.validateConfirmCreationMessage('tu transaccion ha sido procesada exitosamente.');

        await onlineCompaniesPage.inputConfirmationPassword('123');

        //Validar agregar empresa al usuario
        await onlineCompaniesPage.clickAddCompanyButton();
        await relationshipUserCompanyPage.selectGroupCompanie('BANCO DE LA PRODUCCION S.A. PRODUBANCO')
        await relationshipUserCompanyPage.clickArrowRightButton();
        await relationshipUserCompanyPage.inputPassword('123');
        await relationshipUserCompanyPage.clickUpdateButton();
        await relationshipUserCompanyPage.clickConfirmButton();
        await relationshipUserCompanyPage.validateSuccessMessage('tu transaccion ha sido procesada exitosamente.');
        await relationshipUserCompanyPage.validateUserCompanies('BANCO DE LA PRODUCCION S.A. PRODUBANCO')

        //Validar quitar empresa al usuario
        await relationshipUserCompanyPage.selectUserCompanies('BANCO DE LA PRODUCCION S.A. PRODUBANCO')
        await relationshipUserCompanyPage.clickArrowLeftButton();
        await relationshipUserCompanyPage.inputPassword('123');
        await relationshipUserCompanyPage.clickUpdateButton();
        await relationshipUserCompanyPage.clickConfirmButton();
        await relationshipUserCompanyPage.validateSuccessMessage('tu transaccion ha sido procesada exitosamente.');
        await relationshipUserCompanyPage.validateGroupCompanies('BANCO DE LA PRODUCCION S.A. PRODUBANCO')
    });
});