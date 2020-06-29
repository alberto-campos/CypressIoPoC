/* 
* TC 11 - WS Admin Manage Members - When converting a multi user to a single user channels should be reset in the change to single user modal.
*/
/// <reference types="cypress" />
import loginPg from '../../support/pageObjects/loginPg'
import manageOrgPg from '../../support/pageObjects/manageOrgPg'

const loginPage = new loginPg()
const mngOrgPg = new manageOrgPg()

describe('WS Admin - Manage members',function(){
    before(function(){
        cy.fixture('TC01').then(function(data){
        this.data = data    
        })
    })

    beforeEach(function(){
        //Login into Slack
        cy.visit(Cypress.env('url3'))
        loginPage.signInHereLinkforOrgOwners.click()
        loginPage.slackLoggingIn(this.data.orgAdmin,this.data.orgAdminPwd)
    })

    it('TC 11 - WS-Admin Manage members',function(){

        //Navigate to an org workspace /admin page
        var userToSrch = "dmelendez+1234234234@slack-corp.com"
        mngOrgPg.mngOrganizationBtn.invoke('attr', 'href').then(href => {
            cy.visit(Cypress.env('url3')+href)
        })
        mngOrgPg.peopleMenuLink.should('be.visible').click()
        mngOrgPg.enterpriseSrchInput.should('be.visible').type(userToSrch).then((donext)=>{
            mngOrgPg.SrchBarSpinnerWheel.should('not.be.visible')
            mngOrgPg.SrchResultsSpinerWheel.should('not.exist')
            mngOrgPg.firstSearchResult.should('contain',userToSrch)
            mngOrgPg.firstSrchResultMenu.trigger('mouseover').click()
        }) 

       
    })
})