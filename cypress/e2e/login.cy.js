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
    cy.get('input[type="email"]', { timeout: 15000 }).should('be.visible');
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
    const testUser = {
      name: 'Cypress Test User',
      email: `cypress-${Date.now()}@example.com`,
      password: 'password123',
    };

    cy.intercept('POST', '**/v1/login').as('loginRequest');
    cy.intercept('GET', '**/v1/users/me').as('profileRequest');

    cy.request({
      method: 'POST',
      url: 'https://forum-api.dicoding.dev/v1/register',
      body: testUser,
    })
      .its('body.status')
      .should('equal', 'success');

    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type(testUser.password);
    cy.contains('button', 'Masuk').click();
    cy.wait('@loginRequest')
      .its('response.body.status')
      .should('equal', 'success');
    cy.wait('@profileRequest')
      .its('response.body.status')
      .should('equal', 'success');
    cy.location('pathname').should('equal', '/');
  });
});
