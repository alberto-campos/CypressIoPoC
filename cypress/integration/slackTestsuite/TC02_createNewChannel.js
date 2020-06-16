/// <reference types="cypress" />
import channelPg from '../../support/pageObjects/channelPg'

describe('Slack Regression',function(){

    //fetch test data
    before(function(){
        cy.fixture('TC02').then(function(data){
        this.data = data    
        })
    })

    it('TC02 Create New Channel',function(){
        const channelPage = new channelPg()

        //Login into Slack
        cy.visit(Cypress.env('url1'))
        cy.slackLoggingIn(this.data.email,this.data.password)

        //Create New Channel
        channelPage.addChannelsPlusIcon().click()
        channelPage.getCreateChannel().click()

        //verify the content of Create Channel dialog
        channelPage.getChannelName().should('be.visible')
        channelPage.getChannelDescription().should('be.visible')
        channelPage.CreateBtn().should('be.visible')

        //Enter more than 80 characters in the channel name and verify the error message displayed.
        channelPage.getChannelName().type('entermorethan80charactersinthechannelnameandverifytheerrormessagedisplayedelsereport')
        //assert error text correctly displayed
        channelPage.getChannelNameInputError()
                .should('have.contain','Channel names can’t be longer than 80 characters.')
                .and('be.visible')

        //Create new channel
        cy.randomTextGenerator().then((returned_value) =>{
            channelPage.getChannelName().clear().type("testChannel"+returned_value)
        })
        
        channelPage.getChannelDescription().type('This is an automated test channel')
        channelPage.CreateBtn().click()

        //Add People dialog
        channelPage.getAddPeopleHeading().should('have.contain','Add people')
        channelPage.getAddPeopleInput().should('be.visible').type('Luiz')
        cy.wait(2000)
        channelPage.getAddPeopleInput().type('{downarrow}')
        channelPage.getAddPeopleInput().type('{downarrow}')
        channelPage.getAddPeopleInput().type('{enter}')
        channelPage.getDoneBtn().click()
    })
}
)