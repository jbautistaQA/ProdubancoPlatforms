import { expect, type Locator, type Page } from '@playwright/test';

export class RelationshipCompanyProductUserPage {
    //Nombre de los locators
    readonly page: Page;
    static create(page: Page) {
        return new RelationshipCompanyProductUserPage(page);
    }

    readonly companyList: Locator;
    readonly productList: Locator;
    readonly arrowRightButton: Locator;
    readonly arrowLeftButton: Locator;
    readonly password: Locator;
    readonly updateButton: Locator;
    readonly confirmButton: Locator;
    readonly successMessage: Locator;
    readonly goBackButton: Locator;
    readonly productCompanyAssign: Locator;

    constructor(page: Page) {
        //Webelements de la pagina
        this.page = page;
        this.companyList = page.locator('#listaEmpresas');
        this.productList = page.locator('#codProducto');
        this.arrowRightButton = page.locator("input[type='button'][value=' >> ']");
        this.arrowLeftButton = page.locator("input[type='button'][value=' << ']");
        this.password = page.locator('#pass');
        this.updateButton = page.locator("input[type='button'][value='Actualizar']")
        this.confirmButton = page.getByRole('button', { name: 'SI' });
        this.successMessage = page.getByText('tu transaccion ha sido');
        this.goBackButton = page.getByRole('link', { name: '<< Volver' }); //a[style='text-align:left']
        this.productCompanyAssign = page.locator('#codProductoU');
    }

    //funciones de los elementos
    async selectCompanyList(companyName: string) {
        await this.companyList.selectOption(companyName); //BANCO DE LA PRODUCCION S.A. PRODUBANCO
    }

    async selectProductList(productName: string) {
        await this.productList.selectOption(productName);
    }

    async clickArrowRightButton() {
        await this.arrowRightButton.click();
    }

    async clickArrowLeftButton() {
        await this.arrowLeftButton.click();
    }

    async inputPassword(password: string) {
        await this.password.scrollIntoViewIfNeeded();
        await this.password.fill(password);
    }


    async clickUpdateButton() {
        await this.updateButton.scrollIntoViewIfNeeded();
        await this.updateButton.click();
    }

    async clickConfirmButton() {
        await this.confirmButton.click();
    }

    async validateSuccessMessage(message: string) {
        await expect(this.successMessage).toHaveText(new RegExp(message)); //tu transaccion ha sido procesada exitosamente.
    }

    async clickGoBackButton() {
        await this.goBackButton.click();
    }

    async validateCompanyProduct(productName: string) {
        await expect(this.productCompanyAssign).toHaveText(new RegExp(productName));
    }

    async selectProductCompanyAssign(productName: string) {
        await this.productCompanyAssign.selectOption(productName);
    }













}




