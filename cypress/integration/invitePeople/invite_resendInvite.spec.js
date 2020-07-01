/* 
* TC 06 - Resend Invite - Slack user resend the ivite
* TestData does not need reset. 
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

    it('TC 06 - resend Invite',function(){
        // Team Menu Page
       cy.navigateAdminMembersPg()

        // Admin- manage members page
        adminPage.manageMembersHeader.then(($eleHeader => {
            expect($eleHeader.text().trim()).to.contain('Manage members')
        }))     

        //Search member to resend invite
        adminPage.adminMemberSrchInput.click().type(this.data.userForResendInvite).then(function(doNext){
            adminPage.adminMemberSrchInput.type('{enter}')
            adminPage.tableViewLoadingSpinner.should('not.be.visible')
            adminPage.memberEmailLocator.should('contain',this.data.userForResendInvite)
                                        .should('have.length',1)
            adminPage.adminMemberTblBtn.click()
            adminPage.resendInvitationOption.click()
            adminPage.toastWrapper.should('not.exist')
        })
    })//it('resend Invite',function()
})