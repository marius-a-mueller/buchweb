describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('Überprüfe Login', () => {
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=login-username').type('admin');
    cy.get('[data-cy=login-password').type('p');
    cy.get('[data-cy=login-button-second]').click();
  });
  it('Überprüfe Default Zustand', () => {
    cy.get('[data-cy=login-button]').should('exist');
    cy.get('[data-cy=logo').should('exist');
    cy.get('[data-cy=Suche').should('exist');
    cy.get('[data-cy="Neues Buch"]').should('exist');
    cy.get('[data-cy=Diagramme').should('exist');
    cy.get('[data-cy=mehrDazu_Suche').should('exist');
  });
  it.only('Überprüfe Suche mit Gegebene ISBN', () => {
    cy.intercept('GET', '**/rest/**').as('searchRequest');
    cy.get('[data-cy=Suche').click();
    cy.wait(2000);
    cy.get('[data-cy=isbn').type('978-3-897-22583-1');
    cy.get('[data-cy=search-button-form').click();
    cy.wait('@searchRequest')
      .its('response.body')
      .should((body) => {
        expect(body._embedded.buecher[0].isbn).to.equal('978-3-897-22583-1');
      });
  });
});
