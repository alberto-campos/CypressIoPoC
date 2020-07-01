/* 
* TC09 Add New App - Microsoft One Drive app
*/
/// <reference types="cypress" />
import {slackHomePg,manageAppsPg,loginPg} from '../../pageObjects'

const homePg = new slackHomePg()
const mngAppPg = new manageAppsPg()
const loginPage = new loginPg()

before(function(){
    cy.fixture('TC01').then(function(data){
         this.data = data    
     })
})

describe('Manage Apps',function(){

    beforeEach(function(){
        //Login into Slack
        var url = Cypress.env('url1')
        cy.visit(url)
        loginPage.slackLoggingIn(this.data.email,this.data.password)
    })
    
    it('TC 09 - Add New App',function(){
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