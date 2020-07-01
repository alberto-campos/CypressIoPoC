/* 
* TC 02 - create new channel. - Existing Slack user is able to create new private as well as public channels and invite the people. 
* TestData needs reset. 
*/
/// <reference types="cypress" />
import {loginPg,channelPg,messagePg}  from '../../pageObjects'
import helper from '../../support/helper'

const loginPage = new loginPg()
const channelPage = new channelPg()
const msgPg = new messagePg()
const helpUtil = new helper()
var channelName

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

    it('TC 02 - Create New Channel',function(){
        //Create New Channel
        channelPage.addChannelsPlusIcon.click()
        channelPage.createChannel.click()

        //verify the content of Create Channel dialog
        channelPage.channelNameTxtbox.should('be.visible')
        channelPage.channelDescriptionTxtbox.should('be.visible')
        channelPage.createBtn.should('be.visible')

        //Enter more than 80 characters in the channel name and verify the error message displayed.
        channelPage.channelNameTxtbox.type('entermorethan80charactersinthechannelnameandverifytheerrormessagedisplayedelsereport')
        //assert error text correctly displayed
        channelPage.channelNameInputError
                .should('have.contain','Channel names can’t be longer than 80 characters.')
                .and('be.visible')

        //Create new channel
        channelName = "testchannel"+helpUtil.randomTextGenerator()
        channelPage.channelNameTxtbox.clear().type(channelName)
        channelPage.channelDescriptionTxtbox.type('This is an automated test channel')
        channelPage.createBtn.click()

        //Add People dialog
        channelPage.addPeopleHeading.should('have.contain','Add people')
        channelPage.addPeopleInput.should('be.visible').type('Luiz')
        channelPage.loadingStatusMsg.should('not.be.visible')
        channelPage.addPeopleInput.type('{downarrow}')
        channelPage.addPeopleInput.type('{downarrow}')
        channelPage.addPeopleInput.type('{enter}')
        channelPage.doneBtn.click()
        channelPage.doneBtn.should('not.exist')
        msgPg.mostRecentMsg.should('contain','was added to #'+channelName+' by Shweta Bet.')
    })

    after(function(){
        //Delete the channel that is created above as a part of data reset
        channelPage.deleteChannel(channelName)
    })
})