import { expect } from 'chai';
import './commands';

const PASSWORD = import.meta.env.VITE_PASSWORD as string;
const USERNAME = import.meta.env.VITE_USERNAME as string;

describe('template spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/');
    });

    it('Überprüfe Login', () => {
        cy.get('[data-cy=logo]').click();
        cy.get('[data-cy=login-button]').click();
        cy.get('[data-cy=login-username]').type(USERNAME);
        cy.get('[data-cy=login-password]').type(PASSWORD);
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
        cy.get('[data-cy=login-username').type(USERNAME);
        cy.get('[data-cy=login-password').type(PASSWORD);
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
        cy.get('[data-cy=isbn-post]').type('978-3-897-22583-1');
        cy.get('[data-cy=post-button-form]').click();
        cy.wait('@searchRequest')
            .its('response.body')
            .should((body) => {
                expect(body._embedded.buecher[0].isbn).to.equal(
                    '978-3-897-22583-1',
                );
            });
    });

    it('Überprüfe Anzeige eines gesuchten Buches und das Ändern von Buchdetails', () => {
        cy.get('[data-cy=logo]').click();
        cy.intercept('GET', '**/rest/**').as('searchRequest');
        cy.get('[data-cy=Suche]').click();
        cy.wait(2000);
        cy.get('[data-cy=isbn-post]').type('978-3-897-22583-1');
        cy.get('[data-cy=post-button-form]').click();
        cy.wait('@searchRequest')
            .its('response.body')
            .should((body) => {
                expect(body._embedded.buecher[0].isbn).to.equal(
                    '978-3-897-22583-1',
                );
            });

        cy.get('[data-cy=book-table]').within(() => {
            cy.contains('Alpha').should('exist');
        });
        cy.contains('Alpha').click();
        cy.wait(2000);

        //Überprüfe das Ändern von Buchdetails
        cy.get('[data-cy=login-button]').click();
        cy.get('[data-cy=login-username').type(USERNAME);
        cy.get('[data-cy=login-password').type(PASSWORD);
        cy.get('[data-cy=login-button-second]').click();
        cy.wait(2000);
        cy.get('[data-cy=edit-button]').click();
        cy.get('[data-cy=preis-post] input').clear().type('100');
        cy.get('[data-cy=post-rating]').eq(0).click();
        cy.get('[data-cy=type]').contains('DRUCKAUSGABE').click();
        cy.get('[data-cy=post-lieferbar]').click();
        cy.get('[data-cy=post-button-form]').click();
        cy.wait(2000);
    });

    function generateISBN13() {
        let isbn = '9780';
        for (let i = 0; i < 8; i++) {
            isbn += Math.floor(Math.random() * 10);
            isbn += Math.floor(Math.random() * 10);
        }


        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += Number(isbn[i]) * (i % 2 === 0 ? 1 : 3);
            sum += Number(isbn[i]) * (i % 2 === 0 ? 1 : 3);
        }
        const checkDigit = (10 - (sum % 10)) % 10;
        isbn += checkDigit;


        return `${isbn.slice(0, 3)}-${isbn[3]}-${isbn.slice(4, 7)}-${isbn.slice(7, 12)}-${isbn[12]}`;
    }

    describe('Buchverwaltung', () => {
    }

    describe('Buchverwaltung', () => {
        it('Lege neues Buch an', () => {
            const newISBN = generateISBN13();

            cy.get('[data-cy=logo]').click();
            cy.get('[data-cy=login-button]').click();
            cy.get('[data-cy=login-username]').type('admin');
            cy.get('[data-cy=login-password]').type(
                'Bankroll-Subsidize-Revise6',
            );
            cy.get('[data-cy=login-button-second]').click();
            cy.wait(2000);
            cy.intercept('POST', '**/rest/**').as('newBookRequest');
            cy.get('[data-cy="Neues Buch"]').click();
            cy.wait(2000);
            cy.get('[data-cy=isbn-post]').type(newISBN);
            cy.wait(2000);
            cy.get('[data-cy=titel-post]').type('Dracula');
            cy.wait(2000);
            cy.get('[data-cy=homepage-post]').type('https://Dracula.dev');
            cy.wait(2000);
            cy.get('[data-cy=type]').contains('KINDLE').click();
            cy.wait(2000);
            cy.get('[data-cy=post-button-form]').click();
            cy.wait(4000);
            const newISBN = generateISBN13();

            cy.get('[data-cy=logo]').click();
            cy.get('[data-cy=login-button]').click();
            cy.get('[data-cy=login-username]').type(USERNAME);
            cy.get('[data-cy=login-password]').type(PASSWORD);
            cy.get('[data-cy=login-button-second]').click();
            cy.wait(2000);
            cy.intercept('POST', '**/rest/**').as('newBookRequest');
            cy.get('[data-cy="Neues Buch"]').click();
            cy.wait(2000);
            cy.get('[data-cy=isbn-post]').type(newISBN);
            cy.wait(2000);
            cy.get('[data-cy=titel-post]').type('Dracula');
            cy.wait(2000);
            cy.get('[data-cy=homepage-post]').type('https://Dracula.dev');
            cy.wait(2000);
            cy.get('[data-cy=type]').contains('KINDLE').click();
            cy.wait(2000);
            cy.get('[data-cy=post-button-form]').click();
            cy.wait(4000);
        });
    });

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
        cy.get('[data-cy=login-username').type(USERNAME);
        cy.get('[data-cy=login-password').type(PASSWORD);
        cy.get('[data-cy=login-button-second]').click();
        cy.wait(2000);
        cy.get('[data-cy=logout-button').click();
        cy.get('[data-cy=login-button]').should('exist');
    });

    it('Überprüfen der Sidebar', () => {
        const newISBN = generateISBN13();
        cy.viewport('iphone-xr');

        cy.get('[data-cy=logo]').click();
        cy.get('[data-cy=menuButton').should('exist');
        cy.get('[data-cy=menuButton').click();
        cy.get('[data-cy=login-button]').click();
        cy.get('[data-cy=login-username').type(USERNAME);
        cy.get('[data-cy=login-password').type(PASSWORD);
        cy.get('[data-cy=login-button-second]').click();
        cy.wait(2000);
        cy.get('[data-cy=SucheSide').should('exist');
        cy.intercept('GET', '**/rest/**').as('searchRequest');
        cy.get('[data-cy=SucheSide').click();
        cy.wait(2000);
        cy.get('[data-cy=isbn-post').type('978-3-897-22583-1');
        cy.get('[data-cy=post-button-form').click();
        cy.wait('@searchRequest')
            .its('response.body')
            .should((body) => {
                expect(body._embedded.buecher[0].isbn).to.equal(
                    '978-3-897-22583-1',
                );
            });

        cy.get('[data-cy=menuButton]').click();
        //cy.get('[data-cy=neuesBuchSide').should('not.exist');
        cy.intercept('POST', '**/rest/**').as('newBookRequest');
        cy.get('[data-cy=NeuesBuchSide]').click();
        cy.wait(2000);
        cy.get('[data-cy=isbn-post]').type(newISBN);
        cy.wait(2000);
        cy.get('[data-cy=titel-post]').type('Frankenstein');
        cy.wait(2000);
        cy.get('[data-cy=homepage-post]').type('https://Frankenstein.dev');
        cy.wait(2000);
        cy.get('[data-cy=type]').contains('KINDLE').click();
        cy.wait(2000);
        cy.get('[data-cy=post-button-form]').click();
        cy.wait(4000);
        cy.get('[data-cy=menuButton]').click();
        cy.get('[data-cy=DiagrammeS]').click();
        cy.get('[data-cy=SäulendiagrammS]').click();
        cy.wait(2000);
        cy.get('[data-cy=DiagrammeS]').click();
        cy.get('[data-cy=KuchendiagrammS]').click();
    });
});
