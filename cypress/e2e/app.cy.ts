import { FakeModel } from '../../src/app/model';

describe('example-angular-async', () => {
  beforeEach(() => {
    cy.intercept({ method: 'GET', url: '/api/fake1' }, { body: { fake: 'fake1' } as FakeModel }).as('fake1');
    cy.intercept({ method: 'GET', url: '/api/fake2' }, { body: { fake: 'fake2' } as FakeModel, delay: 10000 }).as(
      'fake2',
    );
    cy.intercept({ method: 'GET', url: '/api/fake3' }, { body: { fake: 'fake3' } as FakeModel, delay: 10000 }).as(
      'fake3',
    );
    cy.intercept({ method: 'GET', url: '/api/fake4' }, { body: { fake: 'fake4' } as FakeModel, delay: 10000 }).as(
      'fake4',
    );
    cy.intercept({ method: 'GET', url: '/api/fake5' }, { body: { fake: 'fake5' } as FakeModel, delay: 10000 }).as(
      'fake5',
    );
    cy.visit('/');
  });

  it('should eslint error if the comment is removed', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
  });

  it('should load', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get('.loading').should('exist').should('be.visible');
    cy.get('.loading-done').should('not.exist');
    cy.wait('@fake1');
    cy.get('.loading').should('exist').should('be.visible');
    cy.get('.loading-done').should('not.exist');
    cy.get('.ng-on-init-done').should('exist').should('be.visible');
    cy.wait('@fake2');
    cy.wait('@fake3');
    cy.wait('@fake4');
    cy.wait('@fake5');
  });
});
