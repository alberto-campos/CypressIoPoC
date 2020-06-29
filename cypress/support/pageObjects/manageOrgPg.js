import baseTest from '../baseTest'
/**
 * This class refers to Account Settings related objects
 */
 class manageOrgPg extends baseTest{
    /**
     * returns a locator for 'manage organization' button 
     * @returns {String} element locator
     */
    get mngOrganizationBtn(){
        return cy.get('[data-qa="ws_directory_manage_org_button"]')
    }

    /**
     * returns a locator for People menu link 
     * @returns {String} element locator
     */
    get peopleMenuLink(){
        return cy.get('[data-qa="ent-nav-primary-people"]')
    }

    /**
     * returns a locator for enterprise search input box
     * @returns {String} element locator
     */
    get enterpriseSrchInput(){
        return cy.get('[data-qa="enterprise_search_bar_large"]')
    }

    /**
     * returns a locator for spinning wheel in search input
     * @returns {String} element locator
     */
    get SrchBarSpinnerWheel(){
        return cy.get('.enterprise_search_bar > .infinite_spinner > .infinite_spinner_spinner')
    }

    /**
     * returns a locator for spinning wheel rotating when searching the results.
     * @returns {String} element locator
     */
    get SrchResultsSpinerWheel(){
        return cy.get('.ent_list_row > .infinite_spinner > .infinite_spinner_spinner')
    }

    /**
     * returns a locator for first multi user search result
     * @returns {String} element locator
     */
    get firstSearchResult(){
        return cy.get(':nth-child(1) > .ent_list_row > .ent_list__cell___main')
    }

    /**
     * returns a locator for first multi user search result menu icon
     * @returns {String} element locator
     */
    get firstSrchResultMenu(){
        return cy.get('div.ent_list_actions_context_menu').eq(0)
    }

    
} export default manageOrgPg;