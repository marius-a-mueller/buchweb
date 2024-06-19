

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('Überprüfe Login', () => {
    cy.get('[data-cy=logo]').click();
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=login-username').type('admin');
    cy.get('[data-cy=login-password').type('p');
    cy.get('[data-cy=login-button-second]').click();
    cy.wait(2000);
    cy.get('[data-cy=logo').should('exist');
  });
  it('Überprüfe Default Zustand', () => {
    cy.get('[data-cy=login-button]').should('exist');
    cy.get('[data-cy=logo').should('exist');
    cy.get('[data-cy=Suche').should('exist');
    cy.get('[data-cy=neuesBuch').should('not.exist');
    cy.get('[data-cy=logo').click();
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=login-username').type('admin');
    cy.get('[data-cy=login-password').type('p');
    cy.get('[data-cy=login-button-second]').click();
    cy.wait(2000);
    cy.get('[data-cy="Neues Buch"]').should('exist');
    cy.get('[data-cy=Diagramme').should('exist');
    cy.get('[data-cy=mehrDazu_Suche').should('exist');
  });
  it('Überprüfe Suche mit Gegebene ISBN', () => {
    cy.get('[data-cy=logo]').click();
    cy.intercept('GET', '**/rest/**').as('searchRequest');
    cy.get('[data-cy=Suche').click();
    cy.wait(2000);
    cy.get('[data-cy=isbn-search').type('978-3-897-22583-1');
    cy.get('[data-cy=search-button-form').click();
    cy.wait('@searchRequest')
      .its('response.body')
      .should((body) => {
        expect(body._embedded.buecher[0].isbn).to.equal('978-3-897-22583-1');
      });
  });
  it('Lege neues Buch an', () => {
    cy.get('[data-cy=logo]').click();
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=login-username').type('admin');
    cy.get('[data-cy=login-password').type('p');
    cy.get('[data-cy=login-button-second]').click();
    cy.wait(2000);
    cy.intercept('POST', '**/rest/**').as('newBookRequest');
    cy.get('[data-cy="Neues Buch"]').click();
    cy.wait(2000);
    cy.get('[data-cy=isbn-post').type('978-3-649-64224-4');
    cy.wait(2000);
    cy.get('[data-cy=titel-post').type('Dracula');
    cy.wait(2000);
    cy.get('[data-cy=homepage-post').type('https://Dracula.dev');
    cy.wait(2000);
    cy.get('[data-cy=type]').contains('KINDLE').click();
    cy.wait(2000);
    cy.get('[data-cy=post-button-form').click();
    cy.wait(4000);
  });
  it('Überprüfe die Navigation der Diagramme', () => {
    cy.get('[data-cy=logo]').click();
    cy.get('[data-cy=Diagramme').click();
    cy.get('[data-cy=Säulendiagramm').click();
    cy.get('[data-cy=Diagramme').click();
    cy.get('[data-cy=Piechart').click();
  });
  
  it('Überprüfe Dark Mode', () => { 
    cy.get('[data-cy=logo]').click();
    cy.get('[data-cy=toggle-dark-mode').click();
    cy.get('[data-cy=toggle-dark-mode').click();
  });

  it('Überprüfe Logout', () => {
    cy.get('[data-cy=logo]').click();
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=login-username').type('admin');
    cy.get('[data-cy=login-password').type('p');
    cy.get('[data-cy=login-button-second]').click();
    cy.wait(2000);
    cy.get('[data-cy=logout-button').click();
    cy.get('[data-cy=login-button]').should('exist');
  });

  it('Überprüfen der Sidebar', () => {
    cy.viewport('iphone-xr');

    cy.get('[data-cy=logo]').click();
    cy.get('[data-cy=menuButton').should('exist');
    cy.get('[data-cy=menuButton').click();
    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=login-username').type('admin');
    cy.get('[data-cy=login-password').type('p');
    cy.get('[data-cy=login-button-second]').click();
    cy.wait(2000);
    cy.get('[data-cy=SucheSide').should('exist');
    cy.intercept('GET', '**/rest/**').as('searchRequest');
    cy.get('[data-cy=SucheSide').click();
    cy.wait(2000);
    cy.get('[data-cy=isbn-search').type('978-3-897-22583-1');
    cy.get('[data-cy=search-button-form').click();
    cy.wait('@searchRequest')
      .its('response.body')
      .should((body) => {
        expect(body._embedded.buecher[0].isbn).to.equal('978-3-897-22583-1');
      });
    cy.get('[data-cy=menuButton').click()
    //cy.get('[data-cy=neuesBuchSide').should('not.exist');
    cy.get('[data-cy=NeuesBuchSide').click();
    cy.wait(2000);
    cy.get('[data-cy=isbn-post').type('978-3-649-64224-7');
    cy.wait(2000);
    cy.get('[data-cy=titel-post').type('Frankenstein');
    cy.wait(2000);
    cy.get('[data-cy=homepage-post').type('https://Frankenstein.dev');
    cy.wait(2000);
    cy.get('[data-cy=type]').contains('KINDLE').click();
    cy.wait(2000);
    cy.get('[data-cy=post-button-form').click();
    cy.wait(4000);
    cy.get('[data-cy=menuButton').click()
    cy.get('[data-cy=DiagrammeS').click();
    cy.get('[data-cy=SäulendiagrammS').click();
    cy.wait(2000);
    cy.get('[data-cy=DiagrammeS').click();
    cy.get('[data-cy=KuchendiagrammS').click();
  });
});
