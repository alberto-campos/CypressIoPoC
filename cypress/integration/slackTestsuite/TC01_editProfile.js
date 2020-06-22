/* 
* TC 01 - Edit Profile - Existing slack user caan change his/her profile details- password, name etc.
* TestData need not reset.
*/
/// <reference types="cypress" />
import slackHomePg from '../../support/pageObjects/slackHomePg'
import profilePg from '../../support/pageObjects/profilePg'
import acctSettingsPg from '../../support/pageObjects/acctSettingsPg'

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
        cy.slackLoggingIn(this.data.email,this.data.password)
    })

    it('Edit Profile',function(){
        //Slack Home 
        homePg.getTeamHeaderMenu().click()
        cy.searchTeamMenu('View profile')

        // Profile Page
        profile_Pg.getProfileWindowHeader().invoke('text').then((text => {
            expect(text).to.contain('Profile')
        }))
        profile_Pg.getMemberProfileMoreBtn().click()
        profile_Pg.getAccountSettingsMenuItem().click()

        //Account Settings Pg - Change Password
        cy.visit(Cypress.env('url1')+'/account/settings') // Account Settings link does not have href attribute in dom. Hence using cy.visit
        acctSetting_Pg.getChangePwdExpandBtn().click()
        acctSetting_Pg.getOldPwdInput().should('be.visible')
        acctSetting_Pg.getOldPwdInput().type(this.data.password)
        acctSetting_Pg.getNewPwdInput().type(this.data.password)
        acctSetting_Pg.getSavePwdBtn().click()
        acctSetting_Pg.getPwdIdenticalError().then(($eleError => {
            expect($eleError.text().trim()).to.contain('New and old passwords are identical.')
        }))     
        acctSetting_Pg.getToggleMenuOnAcctSettings().click()
        acctSetting_Pg.getBackToSlacklink().click()
        
        //Back to Slack - update profile
        profile_Pg.getProfileWindowHeader().invoke('text').then((text => {
            expect(text).to.contain('Profile')
        }))
        profile_Pg.getEditProfilePencilIcon().click()
        profile_Pg.getWhatIDoTxtbox().clear()
        profile_Pg.getWhatIDoTxtbox().type('Software Professional')
        profile_Pg.getSaveChangesBtn().click()

        //validate profile changes
        profile_Pg.getEditProfilePencilIcon().click()
        profile_Pg.getWhatIDoTxtbox().then((whtIDolocator => {
            const whatIDotxt = whtIDolocator.prop('value')
            expect(whatIDotxt).to.contain('Software Professional')
        }))     
    })
})