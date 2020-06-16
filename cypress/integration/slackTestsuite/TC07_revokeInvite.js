/// <reference types="cypress" />
import slackHomePg from '../../support/pageObjects/slackHomePg'
import adminPg from '../../support/pageObjects/adminPg'

describe('Slack Regression',function(){

    before(function(){
        cy.fixture('TC07').then(function(data){
        this.data = data    
        })
    })

    it('TC07 revoke Invite',function(){
        const homePg = new slackHomePg()
        const adminPage = new adminPg()

        //Login into Slack
        cy.visit(Cypress.env('url1'))
        cy.slackLoggingIn(this.data.email,this.data.password)

        // Team Menu Page
        homePg.getTeamHeaderMenu().click()
        cy.searchTeamMenu('Settings & administration')
        cy.searchTeamSubMenu('Manage members')
        cy.visit('https://slacktest1-khh9826.slack.com/admin')

        // Admin- manage members page
        adminPage.getManageMembersHeader().then((headerLocator => {
            expect(headerLocator.text().trim()).to.contain('Manage members')
        }))     

        adminPage.getAdminMemberSrchInput().type("lgontijo+b24")
        cy.wait(2000)
        adminPage.getAdminMenuBtn().eq(0).should('be.visible').click()
        adminPage.getRevokeInvitationOption().click()

        //verify if Deactivate member? dialogues is visible
        adminPage.getDeactivateConfirmationDialogHeader().contains('Deactivate').should('be.visible')
        adminPage.getDeactivateBtn().click()
        cy.wait(2000)
        /*adminPage.getDeactivatedMsg().then((msgLocator =>{
            expect(msgLocator.text().trim()).to.contain('Deactivated Lgontijo’s account')
        }))*/

        //Reactivate account again for next usage
        adminPage.getAdminMenuBtn().eq(0).should('be.visible').click()
        adminPage.getActivateAccountOption().click()
    })
})