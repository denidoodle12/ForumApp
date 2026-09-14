/**
 * Test scenarios for login:
 * - displays the login form
 * - rejects invalid credentials and keeps the user on the login page
 * - accepts valid credentials and redirects the user to the home page
 */
describe('Login', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/login');
  });

  it('should display the login page with email, password inputs and submit button', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('button', 'Masuk').should('be.visible');
  });

  it('should display an alert when login fails due to invalid credentials', () => {
    cy.intercept('POST', '**/v1/login').as('loginRequest');
    cy.window().then((window) => {
      cy.stub(window, 'alert').as('loginAlert');
    });

    cy.get('input[type="email"]').type('invalid@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.contains('button', 'Masuk').click();
    cy.wait('@loginRequest')
      .its('response.body.status')
      .should('not.equal', 'success');
    cy.get('@loginAlert').should('have.been.calledOnce');
    cy.url().should('include', '/login');
  });

  it('should redirect to the home page after a successful login', () => {
    cy.intercept('POST', '**/v1/login').as('loginRequest');
    cy.intercept('GET', '**/v1/users/me').as('profileRequest');

    cy.env(['EMAIL', 'PASSWORD']).then(({ EMAIL, PASSWORD }) => {
      expect(EMAIL, 'Cypress login email').to.be.a('string').and.not.be.empty;
      expect(PASSWORD, 'Cypress login password').to.be.a('string').and.not.be.empty;

      cy.get('input[type="email"]').type(EMAIL);
      cy.get('input[type="password"]').type(PASSWORD);
      cy.contains('button', 'Masuk').click();
      cy.wait('@loginRequest').its('response.body.status').should('equal', 'success');
      cy.wait('@profileRequest').its('response.body.status').should('equal', 'success');
      cy.location('pathname').should('equal', '/');
    });
  });
});
