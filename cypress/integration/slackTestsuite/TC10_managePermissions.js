/* 
* TC 10 - Manage Permissions - Provide administrator access to a slack user
* TestData needs reset.
*/
/// <reference types="cypress" />
import slackHomePg from '../../support/pageObjects/slackHomePg'
import adminPg from '../../support/pageObjects/adminPg'
import signOutPg from '../../support/pageObjects/signOutPg'
import loginPg from '../../support/pageObjects/loginPg'

const homePg = new slackHomePg()
const adminPage = new adminPg()
const signOutPage = new signOutPg()
const loginPage = new loginPg()  

describe('TC10 Manage Permissions',function(){
    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    beforeEach(function(){
        //Login into Slack
        cy.visit(Cypress.env('url2'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
    })

    it('manage Permissions',function(){
        //Team Menu Page
        homePg.teamHeaderMenu.click()
        homePg.searchTeamMenu('Settings & administration')
        homePg.searchTeamSubMenu('Manage members')
       
        //Search specific user on Manage members page
        adminPage.adminMemberSrchInput.type(this.data.userForTC10)
        cy.wait(4000)
        cy.selectMemberAcctType(this.data.userForTC10,'Workspace Admin')
        
        //sign out of application
        adminPage.adminMenuIcon.click()
        adminPage.signOutLink.click()
        signOutPage.entireContent.should('be.visible','You’ve signed out of Slack')
   
        //login with user whose permissions are changed
        cy.visit(Cypress.env('url2'))
        loginPage.slackLoggingIn(this.data.userForTC10,'slack123')
        homePg.teamHeaderMenu.click()
        homePg.searchTeamMenu('Settings & administration')
        homePg.searchTeamSubMenu('Manage members')
        adminPage.adminMenuIcon.click()
        adminPage.signOutLink.click()
        signOutPage.entireContent.should('be.visible','You’ve signed out of Slack')

        //reset data for user whose permision where changed back to 'full member'
        cy.visit(Cypress.env('url2'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
        homePg.teamHeaderMenu.click()
        homePg.searchTeamMenu('Settings & administration')
        homePg.searchTeamSubMenu('Manage members')
        adminPage.adminMemberSrchInput.type(this.data.userForTC10)
        cy.wait(3000)
        cy.selectMemberAcctType(this.data.userForTC10,'Full Member')
    })

   /* afterEach(function(){
        
    })*/
})