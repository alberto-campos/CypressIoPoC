/* 
* TC09 Add New App - Microsoft One Drive app
*/
/// <reference types="cypress" />
import slackHomePg from '../../support/pageObjects/slackHomePg'
import manageAppsPg from '../../support/pageObjects/manageAppsPg'

describe('TC09 Add New App',function(){

    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })
    
    it('Add New App',function(){
        const homePg = new slackHomePg()
        const mngAppPg = new manageAppsPg()

        //Login into Slack
        var url = Cypress.env('url1')
        cy.visit(url)
        cy.slackLoggingIn(this.data.email,this.data.password)

        //Team Menu Page
        homePg.getTeamHeaderMenu().click()
        cy.searchTeamMenu('Settings & administration')
        cy.searchTeamSubMenu('Manage apps')
        //cy.visit(url+'/apps/manage?utm_source=in-prod&utm_medium=inprod-apps_link-slack_menu-click')

        //Search Microsoft One Drive App and Add to Slack
        mngAppPg.getAppsSrchInput().type('Microsoft One Drive')
        mngAppPg.getMicrosoftAppCard().click()
        mngAppPg.getAddToSlackBtn().should('be.visible')
    })
})