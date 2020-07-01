/* 
* TC 10 - Manage Permissions - Provide administrator access to a slack user
* TestData needs reset.
*/
/// <reference types="cypress" />
import {loginPg,adminPg,signOutPg}  from '../../pageObjects'

const adminPage = new adminPg()
const signOutPage = new signOutPg()
const loginPage = new loginPg()  

before(function(){
    cy.fixture('TC01').then(function(data){
         this.data = data    
     })
})

describe('User',function(){    
    beforeEach(function(){
        cy.visit(Cypress.env('url2'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
    })

    it('TC 10 - user permissions',function(){
        //Team Menu Page
        cy.navigateAdminMembersPg()

        //Search specific user on Manage members page
        adminPage.adminMemberSrchInput.type(this.data.userForTC10).then(function(doNext){
            adminPage.adminMemberSrchInput.type('{enter}')
            adminPage.tableViewLoadingSpinner.should('not.be.visible')
            adminPage.memberEmailLocator.should('contain',this.data.userForTC10)
                                        .should('have.length',1)
            cy.selectMemberAcctType(this.data.userForTC10,'Workspace Admin')
        })

        //sign out 
        adminPage.adminMenuIcon.click()
        adminPage.signOutLink.scrollIntoView().should('be.visible').click()
        signOutPage.entireContent.should('be.visible','You’ve signed out of Slack')

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