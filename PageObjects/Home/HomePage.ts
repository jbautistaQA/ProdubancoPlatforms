import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    //Nombre de los locators

    readonly page: Page;
    static create(page: Page) {
        return new HomePage(page);
    }
    readonly usersTab: Locator;
    readonly logoutTab: Locator;
    readonly changePasswordTab: Locator;
    readonly administrativeModuleTab: Locator
    readonly maintenanceTab: Locator
    readonly maintenanceUsersTab: Locator
    readonly onlineCompaniesTab: Locator;

    constructor(page: Page) {
        //Webelements de la pagina
        this.page = page;
        this.usersTab = page.getByRole('link', { name: 'Usuarios' }).nth(2)
        this.logoutTab = page.getByRole('link', { name: 'Salir del Módulo' })
        this.changePasswordTab = page.getByRole('link', { name: 'Cambio de Clave' });
        this.maintenanceTab = page.locator('a').filter({ hasText: /^Mantenimiento$/ })
        this.maintenanceUsersTab = page.getByText('Usuarios Empresas Online Mó')
        this.administrativeModuleTab = page.getByRole('link', { name: 'Módulos Administrativos' })
        this.onlineCompaniesTab = page.getByRole('link', { name: 'Empresas Online', exact: true })


    }

    //funciones de los elementos
    async clickOnUsersTab() {
        await this.usersTab.hover();
    }

    async clickOnLogoutButton() {
        await this.logoutTab.click();
    }

    async clickOnChangePassword() {
        await this.changePasswordTab.click();
    }

    async clickOnMaintenanceTab() {
        await this.maintenanceTab.hover();
    }

    async clickOnMaintenanceUsersTab() {
        await this.maintenanceUsersTab.hover();
    }

    async clickOnAdministrativeModule() {
        await this.administrativeModuleTab.click();
    }

    async clickOnOnlineCompaniesTab() {
        await this.onlineCompaniesTab.click();
    }
}

