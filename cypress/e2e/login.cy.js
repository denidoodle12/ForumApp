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
    cy.on('window:alert', (text) => {
      expect(text).to.be.a('string');
    });

    cy.get('input[type="email"]').type('invalid@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.contains('button', 'Masuk').click();
  });

  it('should redirect to the home page after a successful login', () => {
    cy.get('input[type="email"]').type(Cypress.env('EMAIL'));
    cy.get('input[type="password"]').type(Cypress.env('PASSWORD'));
    cy.contains('button', 'Masuk').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });
});
