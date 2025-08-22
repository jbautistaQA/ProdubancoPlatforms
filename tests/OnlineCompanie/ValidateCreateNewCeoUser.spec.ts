import { OnlineCompaniesPage } from '../../PageObjects/Maintenance/OnlineCompanies/OnlineCompaniesPage';
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';
import mysql from 'mysql2/promise';

test.describe('Validate create new CEO user', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let onlineCompaniesPage: OnlineCompaniesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        onlineCompaniesPage = new OnlineCompaniesPage(page);

        await page.goto(LoginPage.LOGIN_PATH);
        await loginPage.inputUsername(users.admin1.username);
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

    test('User creates a new CEO user', async ({ page }) => {
        await homePage.clickOnMaintenanceTab();
        await homePage.clickOnMaintenanceUsersTab();
        await homePage.clickOnOnlineCompaniesTab();
        await expect(page).toHaveURL(OnlineCompaniesPage.ONLINECOMPANIES_URL);

        await onlineCompaniesPage.inputUsername('AUTCEO01')
        await onlineCompaniesPage.inputPhoneNumber('0987654321');
        await onlineCompaniesPage.selectIdentificationType('CC');
        await onlineCompaniesPage.inputIdentificationNumber('1958746651');
        await onlineCompaniesPage.inputFirstName('JOHN1');
        await onlineCompaniesPage.inputMiddlename('DOE1');
        await onlineCompaniesPage.inputLastname('SMITH1');
        await onlineCompaniesPage.inputSecondLastname('JOHNSON1');
        await onlineCompaniesPage.inputCharge('CEO');
        await onlineCompaniesPage.inputPositionArea('MANAGEMENT');
        await onlineCompaniesPage.inputEmail('JOHNSMITH1@YOPMAIL.COM');
        await onlineCompaniesPage.selectStatus('ACTIVO');
        await onlineCompaniesPage.selectSignatureGroup('GRUPO 1 FIRMA');
        await onlineCompaniesPage.inputConfirmationPassword('123');
        await onlineCompaniesPage.clickInsertButton()
        await onlineCompaniesPage.clickConfirmCreationButton();
        await onlineCompaniesPage.validateConfirmCreationMessage('tu transaccion ha sido procesada exitosamente.');
        await onlineCompaniesPage.validateTableRow(
            'AUTCEO01', 'JOHN1 SMITH1', 'JOHNSMITH1@YOPMAIL.COM', 'A')

    });
});