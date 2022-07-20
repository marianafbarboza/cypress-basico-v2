/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  this.beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it.only('Verifica o título da aplicação', function(){
    cy.title()
        .should('be.equal','Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
    cy.get('#firstName').type('Mariana')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('exemplo@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    const longText = 'Teste, teste, teste, teste'
    cy.get('#firstName').type('Mariana')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('exemplo@gmail')
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vazio, quando preenchido com valor não-numérico', function(){
    cy.get('#phone')
      .type('abcdefghijk')
      .should('have.value','')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Mariana')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('exemplo@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
    cy.get('#firstName')
      .type('Mariana')
      .should('have.value','Mariana')
      .clear()
      .should('have.value','')
    cy.get('#lastName')
      .type('Teste')
      .should('have.value','Teste')
      .clear()
      .should('have.value','')
    cy.get('#email')
      .type('exemplo@gmail.com')
      .should('have.value','exemplo@gmail.com')
      .clear()
      .should('have.value','')
    cy.get('#phone')
      .type('31987338911')
      .should('have.value','31987338911')
      .clear()
      .should('have.value','')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
  it('identificar elementos', function(){
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product')
      .select('YouTube')
      .should('have.value','youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value','mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product')
      .select(1)
      .should('have.value','blog')
  })
  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
//        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json',{action: 'drag-drop'})
      .should(function($input){
//        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

})