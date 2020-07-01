/* 
* TC 16 - External shared Channel - Create and connect a shared channel between twp standard paid teams.
* TestData does not need reset. 
*/
/// <reference types="cypress" />
import {loginPg,slackHomePg,channelPg}  from '../../pageObjects'
import helper from '../../support/helper'

const loginPage = new loginPg()
const channelPage = new channelPg()
const homePg = new slackHomePg()
const helpUtil = new helper()

before(function(){
    cy.fixture('TC01').then(function(data){
         this.data = data    
     })
})

describe('Channel',function(){    
   
    beforeEach(function(){
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
    })

    it('TC 16 - External shared channel',function(){
        //Click the "+" besides Channels in the sidebar to trigger the create pop up & name channel
        channelPage.addChannelsPlusIcon.click()
        channelPage.createChannel.click()

        //Create new channel
        var channelName = "sharedchannel"+helpUtil.randomTextGenerator()
        channelPage.channelNameTxtbox.clear().type(channelName)
        channelPage.channelDescriptionTxtbox.type('This is an automated shared test channel')
        channelPage.createBtn.click()
        channelPage.addPeopleHeading.should('have.contain','Add people')
        channelPage.skipForNowBtn.click()
        channelPage.skipForNowBtn.should('not.be.visible')
        channelPage.channelDetailIcon.should('be.visible').click({force:true})
        channelPage.channelDetailsMoreBtn.should('be.visible').click()
        channelPage.channelAdditionalOptionsBtn.should('be.visible').click()
        channelPage.shareChannelBtn.should('be.visible').click()

        //share channel dialogue
        channelPage.shareChannelBtn2.should('be.visible').click()
        channelPage.emailInputforChannelShare.should('be.visible').type('lgontijo+b4@slack-corp.com')
        channelPage.sharedChannelSendBtn.click()
        channelPage.sharedChannelSendBtn.should('not.be.visible')
        cy.get('[data-qa="shared_channel_modal_success_caption"]').should('contain','Invitation sent')
    })
})