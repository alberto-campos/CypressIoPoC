/* 
* TC 18 - Org admin - Org admin should not see the option to take action on an account with the same permissions.
*/
/// <reference types="cypress" />
import {loginPg,adminPg}  from '../../pageObjects'
import helper from '../../support/helper'

const loginPage = new loginPg()
const adminPage = new adminPg()

before(function(){
    cy.fixture('TC01').then(function(data){
         this.data = data    
     })
})

describe('Org Admin',function(){    
   
    beforeEach(function(){
        cy.visit(Cypress.env('url3'))
        loginPage.signInHereLinkforOrgOwners.click()
        loginPage.slackLoggingIn(this.data.orgAdmin,this.data.orgAdminPwd)
    })

    it('TC 18 - Org admin',function(){
        //Sign into an organization as an Org Admin
        cy.visit(Cypress.env('url3'))
        loginPage.signInHereLinkforOrgOwners.click()
        loginPage.slackLoggingIn(this.data.orgAdmin,this.data.orgAdminPwd)

         // Launch workspace
         cy.get("[data-qa='launch']").eq(1).should('exist').then(href => {
            cy.visit('https://app.slack.com/client/TTH0TUV8Q/CTGGW2EQ4')
        })                                   
        cy.navigateAdminMembersPg()

        //search for workspace owner member
        adminPage.adminMemberSrchInput.type('ardahal@slack-corp.com')
        adminPage.adminMemberSrchInput.type('{enter}').then(function(doNext){
            adminPage.tableViewLoadingSpinner.should('not.be.visible')
            adminPage.memberEmailLocator.should('contain','ardahal@slack-corp.com')
                                        .should('have.length',1)
            // check if Ellipsis icon is available for member - it should be disabled
            cy.get('button.p-admin_member_table__menu_button').should('be.disabled')
        })
    })
})