import test, { type Locator, type Page, expect } from "@playwright/test";

export class AdministrativeModulePage {

    readonly page: Page;
    static create(page: Page) {
        return new AdministrativeModulePage(page);
    }
    static ADMINISTRATIVEMODULE_URL = 'https://tomcat-t-ecuador-server.novopayment.net/admnovoWebProd/admusuario.do';
    readonly searchUsername: Locator;
    readonly searchFirstnameAndLastname: Locator;
    readonly emitter: Locator;
    readonly searchButton: Locator;
    readonly cleanSearchButton: Locator;
    readonly username: Locator;
    readonly firstname: Locator;
    readonly middlename: Locator;
    readonly lastname: Locator;
    readonly secondLastname: Locator;
    readonly status: Locator;
    readonly operationalRole: Locator;
    readonly transmitter: Locator;
    readonly charge: Locator;
    readonly identificationType: Locator;
    readonly identificationNumber: Locator;
    readonly email: Locator;
    readonly phoneNumber: Locator;
    readonly positionArea: Locator;
    readonly confirmationPassword: Locator;
    readonly insertButton: Locator;
    readonly confirmCreationButton: Locator;
    readonly updateButton: Locator;
    readonly cleanCreationButton: Locator;
    readonly editUserButton: Locator;
    readonly deleteUserButton: Locator;
    readonly resetPasswordUserButton: Locator;
    readonly successfulUserCreationMessage: Locator;
    readonly successfulUserEditationMessage: Locator;
    readonly successfulUserDeletionMessage: (username: string) => Locator;
    readonly invalidPasswordMessage: Locator;
    readonly correctButton: Locator;
    readonly emptyConfirmationPasswordMessage: Locator;
    readonly existingUserMessage: Locator;
    readonly existingIdentificationMessage: Locator;
    readonly emptyFieldsValidationMessage: Locator;
    readonly invalidUsernameFormatMessage: Locator;
    readonly invalidNamesFormatMessage: Locator;
    readonly invalidIdentificationNumberFormatMessage: Locator;
    readonly invalidEmailFormatMessage: Locator;
    readonly invalidPhoneFormatMessage: Locator;
    readonly invalidLengthPhoneFormatMessage: Locator;
    readonly invalidIdentificacionNumberMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchUsername = page.locator('#id_Usuario');
        this.searchFirstnameAndLastname = page.locator('input[name="nombreUser"]');
        this.emitter = page.locator('select[name="ubicacion"]');
        this.searchButton = page.getByRole('button', { name: 'Buscar' });
        this.cleanSearchButton = page.getByRole('button', { name: 'Limpiar' }).first();
        this.username = page.getByRole('textbox', { name: 'Codigo de Usuario' });
        this.firstname = page.locator('input[name="nombre1"]');
        this.middlename = page.locator('input[name="nombre2"]');
        this.lastname = page.locator('input[name="apellido1"]');
        this.secondLastname = page.locator('input[name="apellido2"]');
        this.status = page.locator('select[name="eestatus"]');
        this.operationalRole = page.locator('select[name="etipo"]');
        this.transmitter = page.locator('select[name="eubicacion"]');
        this.charge = page.locator('input[name="cargo"]');
        this.identificationType = page.locator('select[name="tipo_identificacion"]');
        this.identificationNumber = page.getByRole('textbox', { name: 'Número de identificación' });
        this.email = page.getByRole('textbox', { name: 'Direccion de Correo' });
        this.phoneNumber = page.locator('input[name="telefono"]');
        this.positionArea = page.getByRole('textbox', { name: 'Area' });
        this.confirmationPassword = page.getByRole('textbox', { name: 'Clave de confirmacion' });
        this.insertButton = page.getByRole('button', { name: 'Insertar' });
        this.confirmCreationButton = page.getByRole('button', { name: 'SI' });
        this.updateButton = page.getByRole('button', { name: 'Actualizar' });
        this.cleanCreationButton = page.getByRole('button', { name: 'Limpiar' }).nth(1);
        this.editUserButton = page.locator("input[type = 'button'][value = 'M']");
        this.deleteUserButton = page.locator("input[type = 'button'][value = 'E']");
        this.resetPasswordUserButton = page.locator("input[type = 'button'][value = 'R']");
        this.successfulUserCreationMessage = page.getByText('tu transacci?n ha sido'); //tu transacci?n ha sido procesada exitosamente.
        this.successfulUserEditationMessage = page.getByText('tu transacci�n ha sido'); //tu transacci�n ha sido procesada exitosamente.
        this.successfulUserDeletionMessage = (message: string) => this.page.getByText(new RegExp(message));
        this.invalidPasswordMessage = page.getByText('La contrase&ntilde;a');
        this.correctButton = page.getByRole('button', { name: 'Corregir' });
        this.emptyConfirmationPasswordMessage = page.getByText('Debe ingresar su clave de'); //Debe ingresar su clave de confirmación primero.
        this.existingUserMessage = page.getByText('ya existe un usuario'); //ya existe un usuario registrado con el mismo nombre: ANONIMO01.
        this.existingIdentificationMessage = page.getByText('el nro. de identificaci�n'); // el nro. de identificaci�n 1103646335. Ya se encuentra registrado
        this.emptyFieldsValidationMessage = page.getByText('El campo Usuario está vacío.');
        this.invalidNamesFormatMessage = page.getByText('Campo Primer nombre es invá');
        this.invalidIdentificationNumberFormatMessage = page.getByText('Campo Identificación inválido.');
        this.invalidEmailFormatMessage = page.getByText('Campo Email es inválido.');
        this.invalidPhoneFormatMessage = page.getByText('Campo Número telefónico invá')
        this.invalidUsernameFormatMessage = page.getByText('El nombre de usuario debe ser')
        this.invalidLengthPhoneFormatMessage = page.getByText('Longitud no permitida en')
        this.invalidIdentificacionNumberMessage = page.getByText('el n�mero de identificaci�n')
    }

    async searchUser(username: string) {
        await this.searchUsername.fill(username);
    }

    async clickOnSearchButton() {
        await this.searchButton.click();
    }

    async inputUserName(username: string) {
        await this.username.fill(username);
    }

    async inputFirstname(name: string) {
        await this.firstname.fill(name);
    }

    async inputMiddlename(middleName: string) {
        await this.middlename.fill(middleName);
    }

    async inputLastname(lastName: string) {
        await this.lastname.fill(lastName);
    }

    async inputSecondLastname(secondLastName: string) {
        await this.secondLastname.fill(secondLastName);
    }

    async selectStatus(status: string) {
        await this.status.selectOption(status);
    }

    async selectOperationalRole(role: string) {
        await this.operationalRole.selectOption(role);
    }

    async selectTransmitter(transmitter: string) {
        await this.transmitter.selectOption(transmitter);
    }

    async inputCharge(charge: string) {
        await this.charge.fill(charge);
    }

    async selectIdentificationType(type: string) {
        await this.identificationType.selectOption(type);
    }

    async inputIdentificationNumber(identificationNumber: string) {
        await this.identificationNumber.fill(identificationNumber);
    }

    async inputEmail(email: string) {
        await this.email.fill(email);
    }

    async inputPositionArea(positionArea: string) {
        await this.positionArea.fill(positionArea);
    }

    async inputPhoneNumber(phoneNumber: string) {
        await this.phoneNumber.fill(phoneNumber);
    }

    async inputConfirmationPassword(confirmationPassword: string) {
        await this.confirmationPassword.fill(confirmationPassword);
    }

    async clickInsertButton() {
        await this.insertButton.click();
    }

    async clickConfirmCreationButton() {
        await this.confirmCreationButton.click();
    }

    async validateSuccessfulUserCreationMessage(message: string) {
        await expect(this.successfulUserCreationMessage).toHaveText(message);
    }

    async validateSuccessfulUserEditationMessage(message: string) {
        await expect(this.successfulUserEditationMessage).toHaveText(message);
    }

    async clickOnDeleteUserButton() {
        await this.deleteUserButton.click();
    }

    async validateSuccessfulUserDeletionMessage(message: string) {
        await expect(this.successfulUserDeletionMessage(message)).toBeVisible();
    }

    async validateInvalidPasswordMessage(message: string) {
        await expect(this.invalidPasswordMessage).toHaveText(message);
    }

    async clickOnCorrectButton() {
        await this.correctButton.click();
    }

    async validateEmptyConfirmationPasswordMessage(message: string) {
        await expect(this.emptyConfirmationPasswordMessage).toHaveText(message);
    }

    async validateTableRow(expectedValues: string[]) {
        for (let i = 0; i < expectedValues.length; i++) {
            const cell = this.page.locator(`//*[@id="cxTable"]/tbody/tr/td[${i + 1}]`);
            const cellText = (await cell.textContent())?.trim() || '';
            expect(cellText).toBe(expectedValues[i]);
        }
    }

    async validateExistingUserMessage(message: string) {
        await expect(this.existingUserMessage).toHaveText(message);
    }

    async validateExistingIdentificationMessage(message: string) {
        await expect(this.existingIdentificationMessage).toHaveText(message);
    }

    async clickOnCleanCreationButton() {
        await this.cleanCreationButton.click();
    }

    async validateEmptyFormFields() {
        await expect(this.username).toBeEmpty();
        await expect(this.firstname).toBeEmpty();
        await expect(this.middlename).toBeEmpty();
        await expect(this.lastname).toBeEmpty();
        await expect(this.secondLastname).toBeEmpty();
        await expect(this.status).toHaveValue('');
        await expect(this.operationalRole).toHaveValue('');
        await expect(this.transmitter).toHaveValue('');
        await expect(this.charge).toBeEmpty();
        await expect(this.identificationType).toHaveValue('');
        await expect(this.identificationNumber).toBeEmpty();
        await expect(this.email).toBeEmpty();
        await expect(this.phoneNumber).toBeEmpty();
        await expect(this.positionArea).toBeEmpty();
    }

    async clickOnEditUserButton() {
        await this.editUserButton.click();
    }

    async clickOnUpdateButton() {
        await this.updateButton.click();
    }

    async validateEmptyFieldsValidationMessage(message: string) {
        await expect(this.emptyFieldsValidationMessage).toHaveText(message);
    }

    async validateInvalidUsernameFormatMessage(message: string) {
        await expect(this.invalidUsernameFormatMessage).toHaveText(message);
    }

    async validateInvalidFormatOnNamesFieldsMessage(message: string) {
        await expect(this.invalidNamesFormatMessage).toHaveText(message);

    }

    async validateInvalidIdentificationNumberMessage(message: string) {
        await expect(this.invalidIdentificationNumberFormatMessage).toHaveText(message);

    }

    async validateInvalidEmailFormatMessage(message: string) {
        await expect(this.invalidEmailFormatMessage).toHaveText(message);

    }

    async validateInvalidPhoneFormatMessage(message: string) {
        await expect(this.invalidPhoneFormatMessage).toHaveText(message);

    }

    async validateInvalidLengthPhoneFormatMessage(message: string) {
        await expect(this.invalidLengthPhoneFormatMessage).toHaveText(message);

    }

    async validateInvalidIdentificacionNumberMessage(message: string) {
        await expect(this.invalidIdentificacionNumberMessage).toHaveText(message);
    }
}