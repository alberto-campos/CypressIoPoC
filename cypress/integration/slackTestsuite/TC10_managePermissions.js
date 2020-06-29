/* 
* TC 10 - Manage Permissions - Provide administrator access to a slack user
* TestData needs reset.
*/
/// <reference types="cypress" />
import adminPg from '../../support/pageObjects/adminPg'
import signOutPg from '../../support/pageObjects/signOutPg'
import loginPg from '../../support/pageObjects/loginPg'

const adminPage = new adminPg()
const signOutPage = new signOutPg()
const loginPage = new loginPg()  

describe('Manage Permissions',function(){
    beforeEach(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    it('Login and Navigate to Manage members',function(){
        cy.visit(Cypress.env('url2'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
        //Team Menu Page
        cy.navigateAdminMembersPg()
        
    })

    it('search User & change permissions',function(){
        //Search specific user on Manage members page
        adminPage.adminMemberSrchInput.type(this.data.userForTC10).then(function(doNext){
            adminPage.adminMemberSrchInput.type('{enter}')
            adminPage.tableViewLoadingSpinner.should('not.be.visible')
            adminPage.memberEmailLocator.should('contain',this.data.userForTC10)
                                        .should('have.length',1)
            cy.selectMemberAcctType(this.data.userForTC10,'Workspace Admin')
        })
    })

    it('Sign Out as User 1',function(){
        //sign out of application
        adminPage.adminMenuIcon.click()
        adminPage.signOutLink.scrollIntoView().should('be.visible').click()
        signOutPage.entireContent.should('be.visible','You’ve signed out of Slack')
    })
    
    it('Login with User whose permissions are changed',function(){      
        //login with user whose permissions are changed
        cy.visit(Cypress.env('url2'))
        loginPage.slackLoggingIn(this.data.userForTC10,'slack123')
        cy.navigateAdminMembersPg()
        adminPage.adminMenuIcon.click()
        adminPage.signOutLink.click()
        signOutPage.entireContent.should('be.visible','You’ve signed out of Slack') 
    })

    after(function(){
        //reset data for user whose permision where changed back to 'full member'
        cy.visit(Cypress.env('url2'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
        cy.navigateAdminMembersPg()
        adminPage.adminMemberSrchInput.type(this.data.userForTC10)
        adminPage.adminMemberSrchInput.type('{enter}').then(function(doNext){
            adminPage.tableViewLoadingSpinner.should('not.be.visible')
            adminPage.memberEmailLocator.should('contain',this.data.userForTC10)
                                        .should('have.length',1)
        cy.selectMemberAcctType(this.data.userForTC10,'Full Member')
        })
    })
})