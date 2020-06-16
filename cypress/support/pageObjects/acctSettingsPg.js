//This page refers to Account Settings
class acctSettingsPg{
    getChangePwdExpandBtn(){
     return cy.get('#change_password > .accordion_expand')
    }

    getOldPwdInput(){
        return cy.get('input#old_password')
    }

    getNewPwdInput(){
        return cy.get('input#password')
    }

    getSavePwdBtn(){
        return cy.get('#change_password > .accordion_subsection > .col > :nth-child(5) > .btn')
    }

    getPwdIdenticalError(){
        return cy.get('.alert')
    }

    getToggleMenuOnAcctSettings(){
        return cy.get('#menu_toggle')
    }

    getBackToSlacklink(){
        return cy.get('.primary_nav > :nth-child(2) > a')
    }
}
export default acctSettingsPg;