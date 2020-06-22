/* 
* TC 10 - Manage Permissions - Provide administrator access to a slack user
* TestData needs reset.
*/
/// <reference types="cypress" />
import slackHomePg from '../../support/pageObjects/slackHomePg'
import adminPg from '../../support/pageObjects/adminPg'
import signOutPg from '../../support/pageObjects/signOutPg'

const homePg = new slackHomePg()
const adminPage = new adminPg()
const signOutPage = new signOutPg()  

describe('TC10 Manage Permissions',function(){
    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    beforeEach(function(){
        //Login into Slack
        cy.visit(Cypress.env('url2'))
        cy.slackLoggingIn(this.data.email,this.data.password)
    })

    it('manage Permissions',function(){
        //Team Menu Page
        homePg.getTeamHeaderMenu().click()
        cy.searchTeamMenu('Settings & administration')
        cy.searchTeamSubMenu('Manage members')
       
        //Search specific user on Manage members page
        adminPage.getAdminMemberSrchInput().type(this.data.userForTC10)
        cy.wait(4000)
        cy.selectMemberAcctType(this.data.userForTC10,'Workspace Admin')
        
        //sign out of application
        adminPage.getAdminMenuIcon().click()
        adminPage.getSignOutLink().click()
        signOutPage.getEntireContent().should('be.visible','You’ve signed out of Slack')
   
        //login with user whose permissions are changed
        cy.visit(Cypress.env('url2'))
        cy.slackLoggingIn(this.data.userForTC10,'slack123')
        homePg.getTeamHeaderMenu().click()
        cy.searchTeamMenu('Settings & administration')
        cy.searchTeamSubMenu('Manage members')
        adminPage.getAdminMenuIcon().click()
        adminPage.getSignOutLink().click()
        signOutPage.getEntireContent().should('be.visible','You’ve signed out of Slack')
    })

    afterEach(function(){
        //reset data for user whose permision where changed back to 'full member'
        cy.visit(Cypress.env('url2'))
        cy.slackLoggingIn(this.data.email,this.data.password)
        homePg.getTeamHeaderMenu().click()
        cy.searchTeamMenu('Settings & administration')
        cy.searchTeamSubMenu('Manage members')
        adminPage.getAdminMemberSrchInput().type(this.data.userForTC10)
        cy.wait(3000)
        cy.selectMemberAcctType(this.data.userForTC10,'Full Member')
    })
})