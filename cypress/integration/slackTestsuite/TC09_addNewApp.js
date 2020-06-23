/* 
* TC09 Add New App - Microsoft One Drive app
*/
/// <reference types="cypress" />
import slackHomePg from '../../support/pageObjects/slackHomePg'
import manageAppsPg from '../../support/pageObjects/manageAppsPg'
import loginPg from '../../support/pageObjects/loginPg'

describe('TC09 Add New App',function(){

    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })
    
    it('Add New App',function(){
        const homePg = new slackHomePg()
        const mngAppPg = new manageAppsPg()
        const loginPage = new loginPg()

        //Login into Slack
        var url = Cypress.env('url1')
        cy.visit(url)
        loginPage.slackLoggingIn(this.data.email,this.data.password)

        //Team Menu Page
        homePg.teamHeaderMenu.click()
        homePg.searchTeamMenu('Settings & administration')
        homePg.searchTeamSubMenu('Manage apps')

        //Search Microsoft One Drive App and Add to Slack
        mngAppPg.appsSrchInput.type('Microsoft One Drive')
        mngAppPg.microsoftAppCard.click()
        mngAppPg.addToSlackBtn.should('be.visible')
    })
})