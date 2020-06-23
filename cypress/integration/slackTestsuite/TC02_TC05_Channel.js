/* 
* TC 02 - create new channel. - Existing Slack user is able to create new private as well as public channels and invite the people. 
* TC 05 - send messages to channel - 
* TestData needs reset.
*/
/// <reference types="cypress" />
import channelPg from '../../support/pageObjects/channelPg'
import messagePg from '../../support/pageObjects/messagePg'
import loginPg from '../../support/pageObjects/loginPg'
import helperPg from '../../support/helper'
import helper from '../../support/helper'

const loginPage = new loginPg()
const channelPage = new channelPg()
const msgPg = new messagePg()
const helpUtil = new helper()
var channelName

describe('TC02 Create New Channel, TC05 send Messages to channel',function(){    
    beforeEach(function(){
       cy.fixture('TC01').then(function(data){
            this.data = data    
        })
    })

    it('Create New Channel',function(){
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
        
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
        channelPage.doneBtn.should('not.be.visible')
        cy.wait(1000)
        msgPg.mostRecentMsg.invoke('text').then((text => {
            expect(text.trim()).to.contain('was added to #'+channelName+' by Shweta Bet.')
        }))
    })

    it('Sending Messages to Channel',function(){
        cy.visit(Cypress.env('url1'))
        loginPage.slackLoggingIn(this.data.email,this.data.password)
        //Click on any channel from the list of existing channels
        channelPage.welcomeChannel.click()
        msgPg.sendMessage()
        cy.wait(2000)
        //Edit message
        msgPg.editMessage()
        //delete message
        msgPg.deleteMessage()
    })

    after(function(){
        //Delete the channel that is created above as a part of data cleaning
        channelPage.deleteChannel(channelName)
    })
})