/// <reference types="cypress" />
import channelPg from '../../support/pageObjects/channelPg'

describe('Slack Regression',function(){

    before(function(){
        cy.fixture('TC05').then(function(data){
        this.data = data    
        })
    })

    it('TC05 Sending Messages to Channel',function(){
        const chanelPg = new channelPg()

        //Login into Slack
        cy.visit(Cypress.env('url1'))
        cy.slackLoggingIn(this.data.email,this.data.password)

        //Click on any channel from the list of existing channels
        chanelPg.getWelcomeChannel().click()
        cy.sendMessage()
        cy.wait(2000)

        //Edit message
        cy.editMessage()
       
        //delete message
        cy.deleteMessage()
    })
})