/// <reference types="cypress" />
import slackHomePg from '../../support/pageObjects/slackHomePg'
import adminPg from '../../support/pageObjects/adminPg'

describe('Slack Regression',function(){

    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    it('TC06 resend Invite',function(){
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
        adminPage.getAdminOptions().each(($el, index, $list) => {
            var menuoption=$el.text()
            if(index==0){
            expect(menuoption.trim()).to.contain('Edit info')}
            if(index==1){
            expect(menuoption.trim()).to.contain('Resend invitation')}
            if(index==2){
            expect(menuoption.trim()).to.contain('Change account type')}
            if(index==3){
            expect(menuoption.trim()).to.contain('Revoke invitation')}
        })
        adminPage.getResendInvitationOption().click()
    })
})