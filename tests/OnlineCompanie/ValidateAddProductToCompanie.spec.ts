import { RelationshipCompanyProductUserPage } from '../../PageObjects/Maintenance/OnlineCompanies/RelationshipCompanyProductUserPage';
import { RelationshipUserCompanyPage } from '../../PageObjects/Maintenance/OnlineCompanies/RelationshipUserCompanyPage';
import { OnlineCompaniesPage } from '../../PageObjects/Maintenance/OnlineCompanies/OnlineCompaniesPage';
import { LoginPage } from "../../PageObjects/Login/LoginPage";
import { HomePage } from "../../PageObjects/Home/HomePage";
import users from '../../setup/credentials.json';
import { test, expect } from '@playwright/test';

test.describe('Validate add product to companie', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let onlineCompaniesPage: OnlineCompaniesPage;
    let relationshipUserCompanyPage: RelationshipUserCompanyPage;
    let relationshipCompanyProductUserPage: RelationshipCompanyProductUserPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        onlineCompaniesPage = new OnlineCompaniesPage(page);
        relationshipUserCompanyPage = new RelationshipUserCompanyPage(page);
        relationshipCompanyProductUserPage = new RelationshipCompanyProductUserPage(page);

        await page.goto(LoginPage.LOGIN_PATH);

        await loginPage.inputUsername(users.admin8.username);
        await loginPage.inputPassword(users.globalPassword.password);
        await loginPage.clickLoginButton();
        await expect(page).toHaveURL(LoginPage.DASHBOARD_URL);
    });

    test.afterEach(async ({ page }) => {
        //Eliminar producto
        await relationshipCompanyProductUserPage.selectProductCompanyAssign('DISPERSIÓN DE FONDOS');
        await relationshipCompanyProductUserPage.clickArrowLeftButton();
        await relationshipCompanyProductUserPage.inputPassword('123');
        await relationshipCompanyProductUserPage.clickUpdateButton();
        await relationshipCompanyProductUserPage.clickConfirmButton();
        await relationshipCompanyProductUserPage.validateSuccessMessage("tu transaccion ha sido procesada exitosamente."); //Aqui va a fallar ya que no esta quitando el producto

        //Eliminar empresa del usuario
        await relationshipCompanyProductUserPage.clickGoBackButton();
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

    test('User creates a new CEO user and add product to the companie assinged to him', async ({ page }) => {

        await homePage.clickOnMaintenanceTab();
        await homePage.clickOnMaintenanceUsersTab();
        await homePage.clickOnOnlineCompaniesTab();
        await expect(page).toHaveURL(OnlineCompaniesPage.ONLINECOMPANIES_URL);

        await onlineCompaniesPage.inputUsername('AUTCEO08')
        await onlineCompaniesPage.inputPhoneNumber('0987654321');
        await onlineCompaniesPage.selectIdentificationType('CC');
        await onlineCompaniesPage.inputIdentificationNumber('1715478952');
        await onlineCompaniesPage.inputFirstName('JOHN8');
        await onlineCompaniesPage.inputMiddlename('DOE8');
        await onlineCompaniesPage.inputLastname('SMITH8');
        await onlineCompaniesPage.inputSecondLastname('JOHNSON8');
        await onlineCompaniesPage.inputCharge('CEO');
        await onlineCompaniesPage.inputPositionArea('MANAGEMENT');
        await onlineCompaniesPage.inputEmail('JOHNSMITH8@YOPMAIL.COM');
        await onlineCompaniesPage.selectStatus('ACTIVO');
        await onlineCompaniesPage.selectSignatureGroup('GRUPO 1 FIRMA');
        await onlineCompaniesPage.inputConfirmationPassword('123');
        await onlineCompaniesPage.clickInsertButton()
        await onlineCompaniesPage.clickConfirmCreationButton();
        await onlineCompaniesPage.validateConfirmCreationMessage('tu transaccion ha sido procesada exitosamente.');
        await onlineCompaniesPage.inputConfirmationPassword('123');

        //Agregar empresa al usuario
        await onlineCompaniesPage.clickAddCompanyButton();
        await relationshipUserCompanyPage.selectGroupCompanie('BANCO DE LA PRODUCCION S.A. PRODUBANCO')
        await relationshipUserCompanyPage.clickArrowRightButton();
        await relationshipUserCompanyPage.inputPassword('123');
        await relationshipUserCompanyPage.clickUpdateButton();
        await relationshipUserCompanyPage.clickConfirmButton();
        await relationshipUserCompanyPage.validateSuccessMessage('tu transaccion ha sido procesada exitosamente.');
        await relationshipUserCompanyPage.validateUserCompanies('BANCO DE LA PRODUCCION S.A. PRODUBANCO')

        //Agregar producto a empresa del usuario
        await relationshipUserCompanyPage.inputPassword('123');
        await relationshipUserCompanyPage.clickAddProductsButton();
        await relationshipCompanyProductUserPage.selectCompanyList('BANCO DE LA PRODUCCION S.A. PRODUBANCO');
        await relationshipCompanyProductUserPage.selectProductList('DISPERSIÓN DE FONDOS');
        await relationshipCompanyProductUserPage.clickArrowRightButton();
        await relationshipCompanyProductUserPage.inputPassword('123');
        await relationshipCompanyProductUserPage.clickUpdateButton();
        await relationshipCompanyProductUserPage.clickConfirmButton();
        await relationshipCompanyProductUserPage.validateSuccessMessage('tu transaccion ha sido procesada exitosamente.');
        await relationshipCompanyProductUserPage.clickGoBackButton();

        //Validar que el producto se ha agregado correctamente
        await relationshipUserCompanyPage.inputPassword('123');
        await relationshipUserCompanyPage.clickAddProductsButton();
        await relationshipCompanyProductUserPage.selectCompanyList('BANCO DE LA PRODUCCION S.A. PRODUBANCO');
        await relationshipCompanyProductUserPage.validateCompanyProduct('DISPERSIÓN DE FONDOS');
    });
});