import { expect, type Locator, type Page } from '@playwright/test';

export class RelationshipUserCompanyPage {
    //Nombre de los locators
    readonly page: Page;
    static create(page: Page) {
        return new RelationshipUserCompanyPage(page);
    }

    readonly groupCompanies: Locator;
    readonly userCompanies: Locator;
    readonly arrowRightButton: Locator;
    readonly arrowLeftButton: Locator;
    readonly passwordInput: Locator;
    readonly updateButton: Locator;
    readonly confirmButton: Locator;
    readonly successMessage: Locator;
    readonly groupCompaniesSearch: Locator
    readonly userCompaniesSearch: Locator;
    readonly addProductsButton: Locator;
    readonly correctButton: Locator;
    readonly goBackButton: Locator;
    readonly emptyConfirmationPasswordMessage: Locator;
    readonly invalidPasswordMessage: Locator;


    constructor(page: Page) {
        //Webelements de la pagina
        this.page = page;
        this.groupCompanies = page.locator('#empresasGrupo');
        this.userCompanies = page.locator('#empresasUsuario');
        this.arrowRightButton = page.getByRole('button', { name: '>>' });
        this.arrowLeftButton = page.getByRole('button', { name: '<<' });
        this.passwordInput = page.locator('#pass');
        this.updateButton = page.getByRole('button', { name: 'Actualizar' });
        this.confirmButton = page.getByRole('button', { name: 'SI' });
        this.successMessage = page.getByText('tu transaccion ha sido'); //tu transaccion ha sido procesada exitosamente.
        this.correctButton = page.getByRole('button', { name: 'Corregir' });
        this.groupCompaniesSearch = page.locator('#inpsearch')
        this.userCompaniesSearch = page.locator('#inpsearch_empresa_usuario');
        this.addProductsButton = page.getByRole('button', { name: 'Agregar productos' })
        this.goBackButton = page.getByRole('link', { name: '<< Volver' })
        this.emptyConfirmationPasswordMessage = page.getByText('Debe ingresar su clave de') //Debe ingresar su clave de confirmaci&oacute;n.
        this.invalidPasswordMessage = page.getByText('La contrase&ntilde;a') //La contrase&ntilde;a ingresada es incorrecta.

    }


    //funciones de los elementos
    async selectGroupCompanie(companyName: string) {
        await this.groupCompanies.selectOption(companyName);

    }

    async clickArrowRightButton() {
        await this.arrowRightButton.click();
    }

    async clickArrowLeftButton() {
        await this.arrowLeftButton.click();
    }

    async inputPassword(password: string) {
        await this.passwordInput.scrollIntoViewIfNeeded();
        await this.passwordInput.fill(password);
    }

    async clickUpdateButton() {
        await this.updateButton.click();
    }

    async clickConfirmButton() {
        await this.confirmButton.click();
    }

    async validateSuccessMessage(message: string) {
        await expect(this.successMessage).toHaveText(new RegExp(message));
    }

    async validateUserCompanies(companyName: string) {
        await expect(this.userCompanies).toHaveText(new RegExp(companyName));
    }

    async selectUserCompanies(companyName: string) {
        await this.userCompanies.selectOption(companyName);
    }

    async clickGoBackButton() {
        await this.goBackButton.click();
    }

    async validateGroupCompanies(companyName: string) {
        await expect(this.groupCompanies).toHaveText(new RegExp(companyName));
    }

    async validateEmptyConfirmationPasswordMessage(message: string) {
        await expect(this.emptyConfirmationPasswordMessage).toHaveText(new RegExp(message));
        //Debe ingresar su clave de confirmaci&oacute;n.
    }

    async validateInvalidPasswordMessage(message: string) {
        await expect(this.invalidPasswordMessage).toHaveText(new RegExp(message));
        //La contrase&ntilde;a ingresada es incorrecta.
    }

    async clickCorrectButton() {
        await this.correctButton.click();
    }

    async clickAddProductsButton() {
        await this.addProductsButton.click();
    }











}




