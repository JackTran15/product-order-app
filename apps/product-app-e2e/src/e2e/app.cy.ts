import { Company } from '@product-checkout-assigment/product-lib'
// npx nx e2e product-app-e2e
describe('product-app', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1920, 1080)
  });

  it('Customer Default buy Small x1, Medium x1, Large x1', () => {
    cy.get('#exampleFormControlSelect1').select('Default')
    cy.get('[data-name="Small Pizza"] .cart-btn').click()
    cy.get('[data-name="Medium Pizza"] .cart-btn').click()
    cy.get('[data-name="Large Pizza"] .cart-btn').click()
    cy.get('.buttonCheckout').contains('49.97')
  });

  it('Customer Microsoft buy Small x3, Large x1', () => {
    cy.get('#exampleFormControlSelect1').select(Company.MICROSOFT)
    cy.get('[data-name="Small Pizza"] .cart-btn').click()
    cy.get('[data-name="Small Pizza"] .cart-btn').click()
    cy.get('[data-name="Small Pizza"] .cart-btn').click()
    cy.get('[data-name="Large Pizza"] .cart-btn').click()
    cy.get('.buttonCheckout').contains('45.97')
  });

  it('Customer Amazon buy Medium x3, Large x1', () => {
    cy.get('#exampleFormControlSelect1').select(Company.AMAZON)
    cy.get('[data-name="Medium Pizza"] .cart-btn').click()
    cy.get('[data-name="Medium Pizza"] .cart-btn').click()
    cy.get('[data-name="Medium Pizza"] .cart-btn').click()
    cy.get('[data-name="Large Pizza"] .cart-btn').click()
    cy.get('.buttonCheckout').contains('67.96')
  });

  it('Customer Amazon buy 5 Medium Pizza', () => {
    cy.get('#exampleFormControlSelect1').select(Company.FACEBOOK)
    cy.get('[data-name="Medium Pizza"] .cart-btn').click()
    cy.get('[data-name="Medium Pizza"] .cart-btn').click()
    cy.get('[data-name="Medium Pizza"] .cart-btn').click()
    cy.get('[data-name="Medium Pizza"] .cart-btn').click()
    cy.get('.buttonCheckout').then(($btn) => {
      cy.get('[data-name="Medium Pizza"] .cart-btn').click()
      cy.get('.buttonCheckout').contains($btn.text());
    })
  });

  it('Customer Microsoft buy 3 Small Pizza', () => {
    cy.get('#exampleFormControlSelect1').select(Company.MICROSOFT)
    cy.get('[data-name="Small Pizza"] .cart-btn').click()
    cy.get('[data-name="Small Pizza"] .cart-btn').click()
    cy.get('.buttonCheckout').then(($btn) => {
      cy.get('[data-name="Small Pizza"] .cart-btn').click()
      cy.get('.buttonCheckout').contains($btn.text());
    })
  });

  it('Customer Amazon discount Large Pizza $19.99 per pizza', () => {
    cy.get('#exampleFormControlSelect1').select(Company.AMAZON)
    cy.get('[data-name="Large Pizza"] .cart-btn').click()
    cy.get('[data-name="Large Pizza"] .cart-btn').click()
    cy.get('[data-name="Large Pizza"] .cart-btn').click()
    cy.get('.buttonCheckout').contains(19.99 * 3);
  });
});
