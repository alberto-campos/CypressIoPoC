/* 
* TC 02 - create new channel. - Existing Slack user is able to create new private as well as public channels and invite the people. 
* TC 05 - send messages to channel - 
* TestData needs reset.
*/
/// <reference types="cypress" />
import channelPg from '../../support/pageObjects/channelPg'
import helper from '../../support/helper'

const channelPage = new channelPg()
const helperPg = new helper()
var channelName

describe('TC02 Create New Channel, TC05 send Messages to channel',function(){    
    beforeEach(function(){
       cy.fixture('TC01').then(function(data){
            this.data = data    
        })
    })

    it('Create New Channel',function(){

        cy.visit(Cypress.env('url1'))
        cy.slackLoggingIn(this.data.email,this.data.password)
        //Create New Channel
        channelPage.addChannelsPlusIcon().click()
        channelPage.getCreateChannel().click()

        //verify the content of Create Channel dialog
        channelPage.getChannelNameTxtbox().should('be.visible')
        channelPage.getChannelDescriptionTxtbox().should('be.visible')
        channelPage.CreateBtn().should('be.visible')

        //Enter more than 80 characters in the channel name and verify the error message displayed.
        channelPage.getChannelNameTxtbox().type('entermorethan80charactersinthechannelnameandverifytheerrormessagedisplayedelsereport')
        //assert error text correctly displayed
        channelPage.getChannelNameInputError()
                .should('have.contain','Channel names can’t be longer than 80 characters.')
                .and('be.visible')

        //Create new channel
        channelName = "testchannel"+helperPg.randomTextGenerator()
        channelPage.getChannelNameTxtbox().clear().type(channelName)
        
        channelPage.getChannelDescriptionTxtbox().type('This is an automated test channel')
        channelPage.CreateBtn().click()

        //Add People dialog
        channelPage.getAddPeopleHeading().should('have.contain','Add people')
        channelPage.getAddPeopleInput().should('be.visible').type('Luiz')
        cy.wait(2000)
        channelPage.getAddPeopleInput().type('{downarrow}')
        channelPage.getAddPeopleInput().type('{downarrow}')
        channelPage.getAddPeopleInput().type('{enter}')
        channelPage.getDoneBtn().click()
        cy.wait(2000)
    })

    it('Sending Messages to Channel',function(){
        cy.visit(Cypress.env('url1'))
        cy.slackLoggingIn(this.data.email,this.data.password)
        //Click on any channel from the list of existing channels
        channelPage.getWelcomeChannel().click()
        cy.sendMessage()
        cy.wait(2000)

        //Edit message
        cy.editMessage()
       
        //delete message
        cy.deleteMessage()
    })

    after(function(){
        //Delete the channel that is created above as a part of data cleaning
        cy.deleteChannel(channelName)
    })
})