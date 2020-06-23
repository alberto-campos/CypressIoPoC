/**
 * This Class refers to 'Settings and Administration->Manage apps' page
 */
import baseTest from '../baseTest'
class manageAppsPg extends baseTest{
    /**
     * returns a locator for App Search textbox
     * @returns {String} element locator
     */
    get appsSrchInput(){
        return cy.get('#apps_nav_search_input')
    }

    /**
     * returns a locator for Microsoft App One Drive 
     * @returns {String} element locator
     */
    get microsoftAppCard(){
        return cy.get('[href="/apps/AJBCW09GU"]')
    }

    /**
     * returns a locator for button Add to Slack
     * @returns {String} element locator
     */
    get addToSlackBtn(){
        return cy.get('.mobile_app_actions > .c-button--primary')
    }
}
export default manageAppsPg;