//This page refers to 'Settings and Administration->Manage apps' page
class manageAppsPg{
    /**
     * returns a locator for App Search textbox
     * @return {elementlocator}
     */
    getAppsSrchInput(){
        return cy.get('#apps_nav_search_input')
    }

    /**
     * returns a locator for Microsoft App One Drive 
     * @return {elementlocator}
     */
    getMicrosoftAppCard(){
        return cy.get('[href="/apps/AJBCW09GU"]')
    }

    /**
     * returns a locator for button Add to Slack
     * @return {elementlocator}
     */
    getAddToSlackBtn(){
        return cy.get('.mobile_app_actions > .c-button--primary')
    }
}
export default manageAppsPg;