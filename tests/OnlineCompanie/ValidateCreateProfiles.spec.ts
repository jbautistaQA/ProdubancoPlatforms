import { OnlineCompaniesPage } from '../../PageObjects/Maintenance/OnlineCompanies/OnlineCompaniesPage';
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';

test.describe('Validate create new CEO user and add profile', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let onlineCompaniesPage: OnlineCompaniesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        onlineCompaniesPage = new OnlineCompaniesPage(page);

        await page.goto(LoginPage.LOGIN_PATH);
        await loginPage.inputUsername(users.admin7.username);
        await loginPage.inputPassword(users.globalPassword.password);
        await loginPage.clickLoginButton();
        await expect(page).toHaveURL(LoginPage.DASHBOARD_URL);
    });

    test.afterEach(async ({ page }) => {
        //Eliminar los perfiles
        await onlineCompaniesPage.clickDeleteAllProfiles('123');

        // Cerrar sesión
        await homePage.clickOnUsersTab();
        await homePage.clickOnLogoutButton();
        await expect(page).toHaveURL(LoginPage.LOGIN_URL);
    });

    test('User creates a new CEO user and add profiles to him', async ({ page }) => {
        await homePage.clickOnMaintenanceTab();
        await homePage.clickOnMaintenanceUsersTab();
        await homePage.clickOnOnlineCompaniesTab();
        await expect(page).toHaveURL(OnlineCompaniesPage.ONLINECOMPANIES_URL);

        await onlineCompaniesPage.inputUsername('AUTCEO07')
        await onlineCompaniesPage.inputPhoneNumber('0987654321');
        await onlineCompaniesPage.selectIdentificationType('CC');
        await onlineCompaniesPage.inputIdentificationNumber('2109749073');
        await onlineCompaniesPage.inputFirstName('JOHN7');
        await onlineCompaniesPage.inputMiddlename('DOE7');
        await onlineCompaniesPage.inputLastname('SMITH7');
        await onlineCompaniesPage.inputSecondLastname('JOHNSON7');
        await onlineCompaniesPage.inputCharge('CEO');
        await onlineCompaniesPage.inputPositionArea('MANAGEMENT');
        await onlineCompaniesPage.inputEmail('JOHNSMITH7@YOPMAIL.COM');
        await onlineCompaniesPage.selectStatus('ACTIVO');
        await onlineCompaniesPage.selectSignatureGroup('GRUPO 1 FIRMA');
        await onlineCompaniesPage.inputConfirmationPassword('123');
        await onlineCompaniesPage.clickInsertButton()
        await onlineCompaniesPage.clickConfirmCreationButton();
        await onlineCompaniesPage.validateConfirmCreationMessage('tu transaccion ha sido procesada exitosamente.');

        //CONSULTAS
        await onlineCompaniesPage.addProfileToUser(
            'AUTCEO07',
            'CONSULTAS',
            'ORDEN DE SERVICIO',
            'ANULAR ORDEN DE SERVICIO',
            '123');

        //LOTES
        await onlineCompaniesPage.addProfileToUser(
            'AUTCEO07',
            'LOTES',
            'AUTORIZACIÓN DE LOTES',
            'ELIMINACIÓN DE LOTE',
            '123');

        //REPORTES
        await onlineCompaniesPage.addProfileToUser(
            'AUTCEO07',
            'REPORTES',
            'REPORTE DE ESTADOS DE CUENTA',
            'REPORTE DE ESTADOS DE CUENTA',
            '123');

        //SERVICIOS
        await onlineCompaniesPage.addProfileToUser(
            'AUTCEO07',
            'SERVICIOS',
            'CONSULTA LOTES EMISIÓN/RECEPCIÓN EN EMPRESA',
            'REPORTE LOTES | ESTADO-OPERACION TARJETAS',
            '123');
    });
});