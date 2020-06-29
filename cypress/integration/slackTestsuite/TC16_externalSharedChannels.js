/* 
* TC 16 - External shared Channel - Create and connect a shared channel between twp standard paid teams.
*/
/// <reference types="cypress" />
import loginPg from '../../support/pageObjects/loginPg'
import slackHomePg from '../../support/pageObjects/slackHomePg'
import channelPg from '../../support/pageObjects/channelPg'
import helper from '../../support/helper'

const loginPage = new loginPg()
const homePg = new slackHomePg()
const channelPage = new channelPg()
const helpUtil = new helper()

describe('Exteranl shared channel',function(){
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
        channelPage.channelDetailIcon.should('be.visible').click()
        channelPage.channelDetailsMoreBtn.should('be.visible').click()
        channelPage.channelAdditionalOptionsBtn.should('be.visible').click()
        channelPage.shareChannelBtn.should('be.visible').click()

        //share channel dialogue
        channelPage.shareChannelBtn2.should('be.visible').click()
        channelPage.emailInputforChannelShare.should('be.visible').type('lgontijo+b4@slack-corp.com')
        channelPage.sharedChannelSendBtn.click()
        channelPage.sharedChannelSuccessBtn.should('be.visible').click()

    })
})