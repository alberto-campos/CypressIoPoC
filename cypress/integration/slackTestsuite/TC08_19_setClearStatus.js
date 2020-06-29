/* 
* TC 08 - Set and clear status - Slack user set the status as "in a meeting" for next 4 hours.
* TC 19 - Edit Status - Users are able to set a status
* Test Data needs reset.
*/
/// <reference types="cypress" />
import slackHomePg from '../../support/pageObjects/slackHomePg'
import statusPg from '../../support/pageObjects/statusPg'
import loginPg from '../../support/pageObjects/loginPg'
describe('Set and Clear Status',function(){

    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    it('TC 08 & 19 - Set and Clear Status',function(){
        const homePg = new slackHomePg()
        const statusPage = new statusPg()
        const loginPage = new loginPg()

        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)

        //Team Menu Page
        homePg.teamHeaderMenu.click()
        statusPage.teamMenuStatus.click()

        //Verify the content/web elements of "Set a Status" dialog box
        statusPage.statusDialogHeader.then(function($eleHeader){
            expect($eleHeader.text()).to.contain('Set a status')
        })
        statusPage.whatsYourStatus.should('be.visible')

        //Set Status - In a meeting for 4 hours
        statusPage.status_InAMeeting.contains('In a meeting').click()
        statusPage.selectDurationBtn.click()
        statusPage.selectDurationList.contains('4 hours').click()
        statusPage.saveStatusBtn.click()

        //verify the user calender tooltip icon & its text
        statusPage.calenderIcon.should('be.visible').trigger('mouseover')
        statusPage.statusToolTip.contains('In a meeting').should('be.visible')

        //Clear Status
        homePg.teamHeaderMenu.click()
        homePg.searchTeamMenu('Clear status')
        statusPage.calenderIcon.should('not.be.visible')

    })
})