describe('example-angular-async', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    cy.get('.loading').should('exist').should('be.visible');
    cy.get('.loading-done').should('not.exist');
  });
});
