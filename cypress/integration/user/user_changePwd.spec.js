/* 
* TC 01 - Change password - Existing slack user caan change his/her profile details.
* TestData does not need reset. 
*/
/// <reference types="cypress" />
import {loginPg,slackHomePg,profilePg,acctSettingsPg}  from '../../pageObjects'

const loginPage = new loginPg()
const homePg = new slackHomePg()
const profile_Pg = new profilePg()
const acctSetting_Pg = new acctSettingsPg()

before(function(){
    cy.fixture('TC01').then(function(data){
         this.data = data    
     })
})

describe('User',function(){    
   
    beforeEach(function(){
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
    })

    it('TC 01 - change password',function(){
        //Slack Home 
        homePg.teamHeaderMenu.click()
        homePg.searchTeamMenu('View profile')

        // Profile Page
        profile_Pg.profileWindowHeader.invoke('text').then((text => {
            expect(text).to.contain('Profile')
        }))
        profile_Pg.memberProfileMoreBtn.click()
        profile_Pg.accountSettingsMenuItem.then(href => {
         cy.visit(Cypress.env('url1')+'/account/settings')
        })
        
        //Account Settings Pg - Change Password
        acctSetting_Pg.changePwdExpandBtn.click()
        acctSetting_Pg.oldPwdInput.should('be.visible')
        acctSetting_Pg.oldPwdInput.type(this.data.password)
        acctSetting_Pg.newPwdInput.type(this.data.password)
        acctSetting_Pg.savePwdBtn.click()
        acctSetting_Pg.pwdIdenticalError.then(($eleError => {
            expect($eleError.text().trim()).to.contain('New and old passwords are identical.')
        }))     
    })
})