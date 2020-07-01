/* 
* TC 01 - Edit Profile - Existing slack user caan change his/her profile details.
* TestData does not need reset. 
*/
/// <reference types="cypress" />
import {loginPg,slackHomePg,profilePg}  from '../../pageObjects'

const loginPage = new loginPg()
const homePg = new slackHomePg()
const profile_Pg = new profilePg()

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

    it('TC 01 - Edit Profile',function(){
        //Slack Home 
        homePg.teamHeaderMenu.click()
        homePg.searchTeamMenu('View profile')

        // Profile Page
        profile_Pg.profileWindowHeader.invoke('text').then((text => {
            expect(text).to.contain('Profile')
        }))
               
        // Slack - update profile
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