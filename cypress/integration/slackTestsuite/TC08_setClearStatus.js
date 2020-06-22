/* 
* TC 08 - Set and clear status - Slack user set the status as "in a meeting" for next 4 hours.
* Test Data needs reset.
*/
/// <reference types="cypress" />
import slackHomePg from '../../support/pageObjects/slackHomePg'
import statusPg from '../../support/pageObjects/statusPg'

describe('TC08 Set and Clear Status',function(){

    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    it('Set and Clear Status',function(){
        const homePg = new slackHomePg()
        const statusPage = new statusPg()

        //Login into Slack
        cy.visit(Cypress.env('url1'))
        cy.slackLoggingIn(this.data.email,this.data.password)

        //Team Menu Page
        homePg.getTeamHeaderMenu().click()
        statusPage.getTeamMenuStatus().click()

        //Verify the content/web elements of "Set a Status" dialog box
        statusPage.getSetStatusDialogHeader().then(function($eleHeader){
            expect($eleHeader.text()).to.contain('Set a status')
        })
        statusPage.getWhatsYourStatus().should('be.visible')

        //Set Status - In a meeting for 4 hours
        statusPage.getStatus_InAMeeting().contains('In a meeting').click()
        statusPage.getSelectDurationBtn().click()
        statusPage.getSelectDurationList().contains('4 hours').click()
        statusPage.getSaveStatusBtn().click()

        //verify the user calender tooltip icon & its text
        statusPage.getCalenderIcon().should('be.visible').trigger('mouseover')
        statusPage.getStatusToolTip().contains('In a meeting').should('be.visible')

        //Clear Status
        homePg.getTeamHeaderMenu().click()
        cy.searchTeamMenu('Clear status')
        statusPage.getCalenderIcon().should('not.be.visible')

    })
})