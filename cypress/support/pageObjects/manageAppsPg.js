/**
 * This Class refers to 'Settings and Administration->Manage apps' page
 */
class manageAppsPg{
    /**
     * returns a locator for App Search textbox
     * @returns {String} element locator
     */
    getAppsSrchInput(){
        return cy.get('#apps_nav_search_input')
    }

    /**
     * returns a locator for Microsoft App One Drive 
     * @returns {String} element locator
     */
    getMicrosoftAppCard(){
        return cy.get('[href="/apps/AJBCW09GU"]')
    }

    /**
     * returns a locator for button Add to Slack
     * @returns {String} element locator
     */
    getAddToSlackBtn(){
        return cy.get('.mobile_app_actions > .c-button--primary')
    }
}
export default manageAppsPg;