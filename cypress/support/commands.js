import messagePg from  '../support/pageObjects/messagePg'
import loginPg from  '../support/pageObjects/loginPg'
const msgPg = new messagePg()
const loginPage = new loginPg()

Cypress.Commands.add("slackLoggingIn", (userName, pwd) => {
  loginPage.getUsername().type(userName)
  loginPage.getPassword().click({force: true })
  loginPage.getPassword().type(pwd)
  loginPage.SignInBtn().click({ force: true })
})

Cypress.Commands.add("randomTextGenerator", () => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
})

Cypress.Commands.add("searchAndSelectUser", (user) => {
  cy.get('.ReactVirtualized__Grid__innerScrollContainer').find('.p-dm_browser_modal__option').each(($el,index, $list)=>{
    const userName = $el.find('div.c-base_entity__text-contents>span>span>span').text()
    if(userName.includes(user)){
        $el.click()
    }
  })
})

Cypress.Commands.add("sendMessage", () => {
  msgPg.getMsgInput().type('Hi,This is an automated message.Have a nice day!')
  msgPg.getMsgInput().type('{enter}')
})

Cypress.Commands.add("editMessage", () => {
      msgPg.getMostRecentMsg().trigger('mouseover') //MouseHover on last message
      msgPg.getMoreActions().click() //click on more actions
      msgPg.getEditMessageOption().click() 
      var x 
      cy.randomTextGenerator().then(function(returned_value){
        x = returned_value
        msgPg.getEditMsgInput().type(returned_value)  //appending msg with random value
      })
        msgPg.getSaveChangesBtn().click()

      //Verify Edited Message
      msgPg.getMostRecentMsg().invoke('text').then((text => {
      expect(text.trim()).to.contain('Hi,This is an automated message.Have a nice day!'+x)
      }))
})

Cypress.Commands.add("deleteMessage", () => {
    msgPg.getMostRecentMsg().trigger('mouseover') //MouseHover on last message
    cy.wait(1000)
    msgPg.getMoreActions().click()  //click on more actions
    msgPg.getDeleteMessageOption().click() //click on delete message

    var msgToDelete
    msgPg.getDeleteMsgTxt().then(function(deleteMsg){
        cy.log('Message to be deleted :'+deleteMsg.text())
        msgToDelete = deleteMsg.text()
    })
    cy.server()
    cy.route('/api/chat/**').as('deleteMsg')
    msgPg.getDeleteBtn().click() //click on delete message
    cy.wait('@deleteMsg')
    msgPg.getMostRecentMsg().then(function(msgLocator){
        expect(msgLocator.text()).to.not.contain(msgToDelete)
    })
})

Cypress.Commands.add("searchTeamMenu", (menuOption) => {
  cy.get('button[data-qa="menu_item_button"]').contains(menuOption).click({ force: true })
})

Cypress.Commands.add("searchTeamSubMenu", (subMenuOption) => {
  cy.contains(subMenuOption).should('be.visible').click({ force: true })
})


