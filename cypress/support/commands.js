Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Mariana')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('exemplo@gmail.com')
    cy.get('#open-text-area').type('Testes')
    cy.get('button[type="submit"]').click()
})