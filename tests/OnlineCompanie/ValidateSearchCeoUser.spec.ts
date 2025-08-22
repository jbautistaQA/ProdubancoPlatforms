import { OnlineCompaniesPage } from '../../PageObjects/Maintenance/OnlineCompanies/OnlineCompaniesPage';
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';
import { RelationshipUserCompanyPage } from '../../PageObjects/Maintenance/OnlineCompanies/RelationshipUserCompanyPage';

test.describe('Validate search CEO user', () => {
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
        await loginPage.inputUsername(users.admin3.username);
        await loginPage.inputPassword(users.globalPassword.password);
        await loginPage.clickLoginButton();
        await expect(page).toHaveURL(LoginPage.DASHBOARD_URL);
    });

    test.afterEach(async ({ page }) => {
        await onlineCompaniesPage.inputConfirmationPassword('123');
        await onlineCompaniesPage.clickAddCompanyButton();
        await relationshipUserCompanyPage.selectUserCompanies('BANCO DE LA PRODUCCION S.A. PRODUBANCO')
        await relationshipUserCompanyPage.clickArrowLeftButton();
        await relationshipUserCompanyPage.inputPassword('123');
        await relationshipUserCompanyPage.clickUpdateButton();
        await relationshipUserCompanyPage.clickConfirmButton();
        await relationshipUserCompanyPage.validateSuccessMessage('tu transaccion ha sido procesada exitosamente.');
        await relationshipUserCompanyPage.validateGroupCompanies('BANCO DE LA PRODUCCION S.A. PRODUBANCO')

        // Cerrar sesión
        await homePage.clickOnUsersTab();
        await homePage.clickOnLogoutButton();
        await expect(page).toHaveURL(LoginPage.LOGIN_URL);
    });

    test('User creates a new CEO user and search by diferents filters', async ({ page }) => {
        await homePage.clickOnMaintenanceTab();
        await homePage.clickOnMaintenanceUsersTab();
        await homePage.clickOnOnlineCompaniesTab();
        await expect(page).toHaveURL(OnlineCompaniesPage.ONLINECOMPANIES_URL);
        await onlineCompaniesPage.inputUsername('AUTCEO03')
        await onlineCompaniesPage.inputPhoneNumber('0987654321');
        await onlineCompaniesPage.selectIdentificationType('CC');
        await onlineCompaniesPage.inputIdentificationNumber('2085774145');
        await onlineCompaniesPage.inputFirstName('JOHN3');
        await onlineCompaniesPage.inputMiddlename('DOE3');
        await onlineCompaniesPage.inputLastname('SMITH3');
        await onlineCompaniesPage.inputSecondLastname('JOHNSON3');
        await onlineCompaniesPage.inputCharge('CEO');
        await onlineCompaniesPage.inputPositionArea('MANAGEMENT');
        await onlineCompaniesPage.inputEmail('JOHNSMITH3@YOPMAIL.COM');
        await onlineCompaniesPage.selectStatus('ACTIVO');
        await onlineCompaniesPage.selectSignatureGroup('GRUPO 1 FIRMA');
        await onlineCompaniesPage.inputConfirmationPassword('123');
        await onlineCompaniesPage.clickInsertButton()
        await onlineCompaniesPage.clickConfirmCreationButton();
        await onlineCompaniesPage.validateConfirmCreationMessage('tu transaccion ha sido procesada exitosamente.');
        await onlineCompaniesPage.inputConfirmationPassword('123');
        await onlineCompaniesPage.clickAddCompanyButton();
        await relationshipUserCompanyPage.selectGroupCompanie('BANCO DE LA PRODUCCION S.A. PRODUBANCO')
        await relationshipUserCompanyPage.clickArrowRightButton();
        await relationshipUserCompanyPage.inputPassword('123');
        await relationshipUserCompanyPage.clickUpdateButton();
        await relationshipUserCompanyPage.clickConfirmButton();
        await relationshipUserCompanyPage.validateSuccessMessage('tu transaccion ha sido procesada exitosamente.');
        await relationshipUserCompanyPage.validateUserCompanies('BANCO DE LA PRODUCCION S.A. PRODUBANCO')
        await relationshipUserCompanyPage.clickGoBackButton();

        // Search by Company
        await onlineCompaniesPage.clickCleanSearchButton();
        await onlineCompaniesPage.selectCompanyDropdown('BANCO DE LA PRODUCCION S.A. PRODUBANCO (1792777461001)');
        await onlineCompaniesPage.clickSearchButton();
        await onlineCompaniesPage.validateTableRow(
            'AUTCEO03',
            'JOHN3 SMITH3',
            'JOHNSMITH3@YOPMAIL.COM',
            'A'
        );

        // Search by first name
        await onlineCompaniesPage.clickCleanSearchButton();
        await onlineCompaniesPage.inputSearchName('JOHN3');
        await onlineCompaniesPage.clickSearchButton();
        await onlineCompaniesPage.validateTableRow(
            'AUTCEO03',
            'JOHN3 SMITH3',
            'JOHNSMITH3@YOPMAIL.COM',
            'A'
        );

        // Search by last name
        await onlineCompaniesPage.clickCleanSearchButton();
        await onlineCompaniesPage.inputSearchLastName('SMITH3');
        await onlineCompaniesPage.clickSearchButton();
        await onlineCompaniesPage.validateTableRow(
            'AUTCEO03',
            'JOHN3 SMITH3',
            'JOHNSMITH3@YOPMAIL.COM',
            'A'
        );

        // Search by identification number
        await onlineCompaniesPage.clickCleanSearchButton();
        await onlineCompaniesPage.inputSearchIdentificationNumber('2085774145');
        await onlineCompaniesPage.clickSearchButton();
        await onlineCompaniesPage.validateTableRow(
            'AUTCEO03',
            'JOHN3 SMITH3',
            'JOHNSMITH3@YOPMAIL.COM',
            'A'
        );

        // Search by username
        await onlineCompaniesPage.clickCleanSearchButton();
        await onlineCompaniesPage.inputSearchUsername('AUTCEO03');
        await onlineCompaniesPage.clickSearchButton();
        await onlineCompaniesPage.validateTableRow(
            'AUTCEO03',
            'JOHN3 SMITH3',
            'JOHNSMITH3@YOPMAIL.COM',
            'A'
        );

    });
});