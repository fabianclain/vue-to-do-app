/// <reference types="cypress" />
const faker = require("faker");
const css = require("./../constants/css");
const config = require("./../constants/config");
const Utils = require("./../modules/Utils");
let listElement;
context('main form', () => {

  before(() => {
    cy.visit(config.website);
    listElement = cy.get(css.repeater);
  })
  it('toMatchImageSnapshot - whole page', () => {
    cy.visit(config.website)
      .then(() => {
        cy.document()
          .toMatchImageSnapshot();
      });
  });
  it('toMatchImageSnapshot - element', () => {
    cy.visit(config.website)
      .then(() => {
        cy.get(css.repeater).last()
          .toMatchImageSnapshot();
      });
  });
  it('form control css property check', () => {
    cy.get(css.formControl)
      .invoke('attr', 'placeholder')
      .should('equal', 'Create a new to-do...')
  });

  it('should contain the head title', () => {
    cy.get('h1')
      .contains('My to-dos')
      .should('be.visible')
  });
  it('should add something to list', () => {
    cy.get('form')
      .should('be.visible')
      .type(faker.name.findName())
      .submit();
  });

  it('should edit element from the list', () => {
    cy.get(css.editBtn).first()
      .click();
  });

  it('should check elements length', () => {
    let form = cy.get('.d-flex form input');

    form
      .clear()
      .type('something else')
      .type('{enter}');
  });

  Utils.checkElementLength(css.repeater, 4)

  it('toMatchSnapshot - JSON', () => {
    cy.get('.flex-grow-1').first()
      .toMatchSnapshot({
        ignoreExtraFields: true,
      });
  });
  it('should delete the new element from the list', () => {
    cy.get(css.deleteBtn).first()
      .click();
  });
  Utils.checkElementLength(css.repeater, 3)
  
  // Utils.wait(5000);

})
