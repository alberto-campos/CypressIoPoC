/// <reference types="cypress" />
import slackHomePg from '../../support/pageObjects/slackHomePg'
import profilePg from '../../support/pageObjects/profilePg'
import acctSettingsPg from '../../support/pageObjects/acctSettingsPg'

describe('Slack Regression',function(){
    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    it('TC01 Edit Profile',function(){
        const homePg = new slackHomePg()
        const profile_Pg = new profilePg()
        const acctSetting_Pg = new acctSettingsPg()

        //Login into Slack
        cy.visit(Cypress.env('url1'))
        cy.slackLoggingIn(this.data.email,this.data.password)

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
        cy.visit('https://slacktest1-khh9826.slack.com/account/settings')
        acctSetting_Pg.getChangePwdExpandBtn().click()
        acctSetting_Pg.getOldPwdInput().should('be.visible')
        acctSetting_Pg.getOldPwdInput().type(this.data.password)
        acctSetting_Pg.getNewPwdInput().type(this.data.password)
        acctSetting_Pg.getSavePwdBtn().click()
        acctSetting_Pg.getPwdIdenticalError().then((errLocator => {
            expect(errLocator.text().trim()).to.contain('New and old passwords are identical.')
        }))     
        acctSetting_Pg.getToggleMenuOnAcctSettings().click()
        acctSetting_Pg.getBackToSlacklink().click()

        //Back to Slack - update profile
        profile_Pg.getProfileWindowHeader().invoke('text').then((text => {
            expect(text).to.contain('Profile')
        }))
        profile_Pg.getEditProfileIcon().click()
        profile_Pg.getWhatIDoTxtbox().clear()
        profile_Pg.getWhatIDoTxtbox().type('Software Professional')
        profile_Pg.getSaveChangesBtn().click()

        //validate profile changes
        profile_Pg.getEditProfileIcon().click()
        profile_Pg.getWhatIDoTxtbox().then((whtIDolocator => {
            const whatIDotxt = whtIDolocator.prop('value')
            expect(whatIDotxt).to.contain('Software Professional')
        }))     
    })
})