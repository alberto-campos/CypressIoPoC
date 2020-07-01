/* 
* TC 07 - Revoke Invite - Slack user revoke the invite
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

describe('invite People',function(){    
    beforeEach(function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
    })

    it('TC 07 - revoke Invite',function(){
        // Team Menu Page
        cy.navigateAdminMembersPg()

        // Admin- manage members page
        adminPage.manageMembersHeader.should('contain','Manage members')
        
        //search member
        adminPage.adminMemberSrchInput.click().type(this.data.userForRevokeInvite)
        adminPage.adminMemberSrchInput.type('{enter}')
        adminPage.tableViewLoadingSpinner.should('not.exist')
        adminPage.memberEmailLocator.should('contain',this.data.userForRevokeInvite)
                                    .should('have.length',1)
        adminPage.adminMemberTblBtn.click({force:true})
        adminPage.revokeInvitationOption.click()

        //verify if Deactivate member? dialogue is visible
        adminPage.deactivateConfirmationDialogHeader.contains('Deactivate').should('be.visible')
        adminPage.deactivateBtn.click() 
    })

    after(function(){
        //Reactivate account again for next usage of Revoke Invitation test case
        adminPage.deactivateConfirmationDialogHeader.should('not.be.exist')
        adminPage.memberEmailLocator.should('contain',this.data.userForRevokeInvite)
                                    .should('have.length',1)
        adminPage.toastWrapper.should('not.exist')
        adminPage.adminMemberTblBtn.click({force:true})
        adminPage.activateAccountOption.click()
    })
})