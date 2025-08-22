import test, { type Locator, type Page, expect } from "@playwright/test";

export class OnlineCompaniesPage {
    readonly page: Page;
    static create(page: Page) {
        return new OnlineCompaniesPage(page);
    }

    static ONLINECOMPANIES_URL = 'https://tomcat-t-ecuador-server.novopayment.net/admnovoWebProd/usuarioEmpresa.do';

    readonly username: Locator;
    readonly phoneNumber: Locator;
    readonly identificationType: Locator;
    readonly identificationNumber: Locator;
    readonly firstName: Locator;
    readonly middlename: Locator;
    readonly lastname: Locator;
    readonly secondLastname: Locator;
    readonly charge: Locator;
    readonly positionArea: Locator;
    readonly email: Locator;
    readonly status: Locator;
    readonly signatureGroup: Locator;
    readonly signatureOrder: Locator;
    readonly confirmationPassword: Locator;

    readonly insertButton: Locator;
    readonly updateButton: Locator;
    readonly cleanButton: Locator;

    readonly searchName: Locator;
    readonly searchLastName: Locator;
    readonly searchIdentificationNumber: Locator;
    readonly searchUsername: Locator;
    readonly selectCompanies: Locator;

    readonly searchButton: Locator;
    readonly cleanSearchButton: Locator;

    readonly selectProfile: Locator;
    readonly selectModule: Locator;
    readonly selectFunction: Locator;
    readonly createProfileButton: Locator;
    readonly deleteProfileButton: Locator;
    readonly editUserButton: Locator;
    readonly addCompanyButton: Locator;

    readonly confirmCreationButton: Locator;
    readonly confirmCreationMessage: Locator;
    readonly confirmUpdateMessage: (username: string) => Locator;
    readonly companyDropdown: Locator;

    constructor(page: Page) {
        //Formulario de creacion de usuario
        //Campos
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Usuario' });
        this.phoneNumber = page.getByRole('textbox', { name: 'Número telefónico' });
        this.identificationType = page.locator('#tipo_identificacion'); //Seleccione CC PP
        this.identificationNumber = page.getByRole('textbox', { name: 'NÚMERO IDENTIFICACIÓN' });
        this.firstName = page.getByRole('textbox', { name: 'Primer nombre' });
        this.middlename = page.getByRole('textbox', { name: 'Segundo nombre' });
        this.lastname = page.getByRole('textbox', { name: 'Primer apellido' });
        this.secondLastname = page.getByRole('textbox', { name: 'Segundo apellido' });
        this.charge = page.getByRole('textbox', { name: 'Cargo' });
        this.positionArea = page.getByRole('textbox', { name: 'Área' });
        this.email = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.status = page.locator('select[name="ecsstatus"]'); //Seleccione ACTIVO SUSPENDIDO
        this.signatureGroup = page.locator('select[name="eaccodgrupo"]'); //Seleccione GRUPO 1 FIRMA GRUPO 2 FIRMAS
        this.signatureOrder = page.locator('#orden'); //DEFAULT PRIMERA SEGUNDA
        this.confirmationPassword = page.locator('#pass');

        //Botones
        this.insertButton = page.getByRole('button', { name: 'Insertar' });
        this.updateButton = page.getByRole('button', { name: 'Actualizar' });
        this.cleanButton = page.getByRole('button', { name: 'Limpiar' }).first();

        //Formulario de busqueda de usuario
        //Campos
        this.searchName = page.locator('input[name="acnom1usuario"]');
        this.searchLastName = page.locator('input[name="acape1usuario"]');
        this.searchIdentificationNumber = page.locator("input[type=text][name='acidusuario']");
        this.searchUsername = page.getByRole('row', { name: 'Identificación: Usuario:', exact: true }).locator('input[name="accodusuario"]');
        this.selectCompanies = page.locator('#B_rif');

        //Botones
        this.searchButton = page.getByRole('button', { name: 'Buscar' });
        this.cleanSearchButton = page.getByRole('button', { name: 'Limpiar' }).nth(1);

        //Tabla de resultados
        this.selectProfile = page.locator('select[id="cod_perfil"]'); //selecciona perfil 
        this.selectModule = page.locator('select[id="cod_modulo"]'); //selecciona modulo 
        this.selectFunction = page.locator('select[id="funciones"]'); //selecciona funciones
        this.createProfileButton = page.locator("input[value='Crear Perfil']"); //Boton crear perfil
        this.deleteProfileButton = page.locator("input[onclick='eliminar(this.form,this)'][type='button'][value='E']"); //Boton eliminar perfil
        this.editUserButton = page.locator("input[type=button][value='M']"); //Boton registro usuario
        this.addCompanyButton = page.locator("input[type=button][value='A']"); //Boton agregar empresa

        this.confirmCreationButton = page.getByRole('button', { name: 'SI' });
        this.confirmCreationMessage = page.getByText('tu transaccion ha sido procesada exitosamente.');

        this.confirmUpdateMessage = (message: string) => this.page.getByText(new RegExp(message));
        this.companyDropdown = page.locator('select[name="empresa"]');
    }

    async inputUsername(username: string) {
        await this.username.fill(username);
    }

    async inputPhoneNumber(phone: string) {
        await this.phoneNumber.fill(phone);
    }

    async selectIdentificationType(option: string) {
        await this.identificationType.selectOption(option);
    }

    async inputIdentificationNumber(identification: string) {
        await this.identificationNumber.fill(identification);
    }

    async inputFirstName(firstName: string) {
        await this.firstName.fill(firstName);
    }

    async inputMiddlename(middlename: string) {
        await this.middlename.fill(middlename);
    }

    async inputLastname(lastname: string) {
        await this.lastname.fill(lastname);
    }

    async inputSecondLastname(secondLastname: string) {
        await this.secondLastname.fill(secondLastname);
    }

    async inputCharge(charge: string) {
        await this.charge.fill(charge);
    }

    async inputPositionArea(positionArea: string) {
        await this.positionArea.fill(positionArea);
    }

    async inputEmail(email: string) {
        await this.email.fill(email);
    }

    async selectStatus(option: string) {
        await this.status.selectOption(option);
    }

    async selectSignatureGroup(option: string) {
        await this.signatureGroup.selectOption(option);
    }

    async selectSignatureOrder(option: string) {
        await this.signatureOrder.selectOption(option);
    }

    async inputConfirmationPassword(confirmationPassword: string) {
        await this.confirmationPassword.scrollIntoViewIfNeeded();
        await this.confirmationPassword.fill(confirmationPassword);
    }

    async clickInsertButton() {
        await this.insertButton.click();
    }

    async clickUpdateButton() {
        await this.updateButton.click();
    }

    async clickCleanButton() {
        await this.cleanButton.click({ timeout: 10000 });
    }

    async inputSearchName(name: string) {
        await this.searchName.fill(name);
    }

    async inputSearchLastName(lastName: string) {
        await this.searchLastName.fill(lastName);
    }

    async inputSearchIdentificationNumber(identificationNumber: string) {
        await this.searchIdentificationNumber.fill(identificationNumber);
    }

    async inputSearchUsername(username: string) {
        await this.searchUsername.fill(username);
    }

    async selectCompanie(option: string) {
        await this.selectCompanies.selectOption(option);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickCleanSearchButton() {
        await expect(this.cleanSearchButton).toBeEnabled({ timeout: 10000 })
        await this.cleanSearchButton.click();
    }

    async selectProfileOption(option: string) {
        await this.selectFunction.scrollIntoViewIfNeeded()
        await this.selectProfile.click();
        await this.selectProfile.selectOption(option);
    }

    async selectModuleOption(option: string) {
        await this.selectFunction.scrollIntoViewIfNeeded()
        await this.selectModule.click();
        await this.selectModule.selectOption(option);
    }
    async selectFunctionOption(option: string) {
        await this.selectFunction.scrollIntoViewIfNeeded()
        await this.selectFunction.click();
        await this.selectFunction.selectOption(option);
    }

    async clickCreateProfileButton() {
        await this.selectFunction.scrollIntoViewIfNeeded()
        await this.createProfileButton.click();
    }

    async clickDeleteProfileButton(password: string) {
        await this.inputConfirmationPassword(password);
        await this.deleteProfileButton.first().click();
        await this.clickConfirmCreationButton()
    }

    async clickDeleteAllProfiles(password: string) {
        const selectors = ['#TEBANU', '#TEBELI', '#REPEDO', '#OPCONL'];

        for (const selector of selectors) {
            await this.inputConfirmationPassword(password);
            await this.page.locator(selector).click();
            await this.clickConfirmCreationButton();
        }
    }

    async clickEditUserButton() {
        await this.editUserButton.click();
    }

    async clickAddCompanyButton() {
        await this.addCompanyButton.click();
    }

    async clickConfirmCreationButton() {
        await this.confirmCreationButton.click();
    }

    async validateConfirmCreationMessage(message: string) {
        await expect(this.page.getByRole('alert')).toContainText('tu transaccion ha sido procesada exitosamente.');
        await expect(this.confirmCreationMessage).toBeVisible({ timeout: 15000 });
        await expect(this.confirmCreationMessage).toHaveText(message);
    }

    /*async validateTableRow(user: string, fullName: string, email: string, status: string) {
        // Busca la fila que contiene todas las celdas esperadas
        await expect(this.page.getByRole('cell', { name: user, exact: true })).toHaveText(user);
        await expect(this.page.getByRole('cell', { name: fullName, exact: true })).toHaveText(fullName);
        await expect(this.page.getByRole('cell', { name: email, exact: true })).toHaveText(email);
        await expect(this.page.getByRole('cell', { name: status, exact: true })).toHaveText(status);
    }*/

    async validateTableRow(user: string, fullName: string, email: string, status: string) {
        const userCell = this.page.locator(`//td[normalize-space()='${user}']`);
        const fullNameCell = this.page.locator(`//td[normalize-space()='${fullName}']`);
        const emailCell = this.page.locator(`//td[normalize-space()='${email}']`);
        const statusCell = this.page.locator(`//td[normalize-space()='${status}']`);

        await expect(userCell).toBeVisible();
        await expect(fullNameCell).toBeVisible();
        await expect(emailCell).toBeVisible();
        await expect(statusCell).toBeVisible();
    }


    async validateConfirmUpdateMessage(message: string) {
        await expect(this.confirmUpdateMessage(message)).toBeVisible();
    }

    async selectCompanyDropdown(companyName: string) {
        await this.companyDropdown.selectOption(companyName);
    }

    async validateFormFieldsEmpty() {
        await expect(this.username).toBeEmpty();
        await expect(this.phoneNumber).toBeEmpty();
        await expect(this.identificationType).toHaveValue('');
        await expect(this.identificationNumber).toBeEmpty();
        await expect(this.firstName).toBeEmpty();
        await expect(this.middlename).toBeEmpty();
        await expect(this.lastname).toBeEmpty();
        await expect(this.secondLastname).toBeEmpty();
        await expect(this.charge).toBeEmpty();
        await expect(this.positionArea).toBeEmpty();
        await expect(this.email).toBeEmpty();
        await expect(this.status).toHaveValue('');
        await expect(this.signatureGroup).toHaveValue('');
        await expect(this.signatureOrder).toHaveValue('0');
        await expect(this.confirmationPassword).toBeEmpty();
    }

    async addProfileToUser(username: string, profileOption: string, moduleOption: string, functionOption: string, password: string) {
        await this.clickCleanSearchButton();
        await this.inputSearchUsername(username);
        await this.selectProfileOption(profileOption);
        await this.selectModuleOption(moduleOption);
        await this.selectFunctionOption(functionOption);
        await this.inputConfirmationPassword(password);
        await this.clickCreateProfileButton();
        await this.clickConfirmCreationButton();
    }
}

