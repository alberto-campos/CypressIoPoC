/* 
* TC 01 - Edit Profile - Existing slack user caan change his/her profile details- password, name etc.
* TestData need not reset.
*/
/// <reference types="cypress" />
import loginPg from '../../support/pageObjects/loginPg'
import slackHomePg from '../../support/pageObjects/slackHomePg'
import profilePg from '../../support/pageObjects/profilePg'
import acctSettingsPg from '../../support/pageObjects/acctSettingsPg'

const loginPage = new loginPg()
const homePg = new slackHomePg()
const profile_Pg = new profilePg()
const acctSetting_Pg = new acctSettingsPg()

describe('TC01 Edit Profile',function(){
    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    beforeEach(function(){
        //Login into Slack
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
    })

    it('Edit Profile',function(){
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
        acctSetting_Pg.toggleMenuOnAcctSettings.click()
        acctSetting_Pg.backToSlacklink.click()
        
        //Back to Slack - update profile
        profile_Pg.profileWindowHeader.invoke('text').then((text => {
            expect(text).to.contain('Profile')
        }))
        profile_Pg.editProfilePencilIcon.click()
        profile_Pg.whatIDoTxtbox.clear()
        profile_Pg.whatIDoTxtbox.type('Software Professional')
        profile_Pg.saveChangesBtn.click()

        //validate profile changes
        profile_Pg.editProfilePencilIcon.click()
        profile_Pg.whatIDoTxtbox.then((whtIDolocator => {
            const whatIDotxt = whtIDolocator.prop('value')
            expect(whatIDotxt).to.contain('Software Professional')
        }))     
    })
})