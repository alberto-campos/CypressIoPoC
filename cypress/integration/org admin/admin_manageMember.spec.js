/* 
* TC 11 - WS Admin Manage Members - When converting a multi user to a single user channels should be reset in the change to single user modal.
* TestData needs reset. 
*/
/// <reference types="cypress" />
import {loginPg,adminPg}  from '../../pageObjects'

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

    it('TC 11 - WS-Admin Manage members',function(){
        // Launch workspace
        cy.get("[data-qa='launch']").eq(1).should('exist').then(href => {
            cy.visit('https://app.slack.com/client/TTH0TUV8Q/CTGGW2EQ4')    //No href present in dom for this link
        })                                   
        
        cy.navigateAdminMembersPg()
       
        //Navigate to team admin page
        adminPage.adminMemberSrchInput.type(this.data.userForTC11)
        adminPage.adminMemberSrchInput.type('{enter}').then(function(doNext){
            adminPage.tableViewLoadingSpinner.should('not.be.visible')
            adminPage.memberEmailLocator.should('contain',this.data.userForTC11)
                                        .should('have.length',1)
            cy.selectMemberAcctType(this.data.userForTC11,'Single-Channel Guest')
            adminPage.toastWrapper.should('not.exist')
        })     
    }) //it

    afterEach(function(){
        //reset user
        cy.selectMemberAcctType(this.data.userForTC11,'Multi-Channel Guest')
    })
})