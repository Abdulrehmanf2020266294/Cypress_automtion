describe('Programmers Force Header Tests', function() {

  // Hook to set up common preconditions before each test
  beforeEach(() => {
    // Catch and handle any uncaught exceptions to prevent Cypress test interruptions
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Visit the Programmers Force homepage before each test
    cy.visit("https://pf.com.pk/");
  });

  it('should display the header logo and navigate to the home page when clicked', function() {
    // Click the header logo and verify navigation to the homepage
    cy.get('header img').first().click({ force: true });
    cy.url().should('eq', 'https://pf.com.pk/');
  });

  it('should navigate to the About Us page when the About Us link is clicked', function() {
    // Click the "About Us" link and verify the URL change
    cy.get('header').contains('About Us').click();
    cy.url().should('include', '/about');
  });

  it('should display dropdown options for Careers and verify navigation', function() {
    // Click the "Careers" link and ensure dropdown options are visible
    cy.get('header').contains('Careers').click();
    cy.url().should('include', '/career');

    // Verify dropdown menu visibility
    cy.get('ul.sub-menu').should('be.visible');

    // Ensure "Open Positions" and "Send Resume" options are present
    cy.get('ul.sub-menu').contains('Open Positions').should('be.visible');
    cy.get('ul.sub-menu').contains('Send Resume').should('be.visible');

    // Click "Open Positions" and verify navigation
    cy.get('ul.sub-menu').contains('Open Positions').click({ force: true });
    cy.url().should('include', '/apply-now');

    // Go back to previous page
    cy.go('back');

    // Reopen dropdown and click "Send Resume" to verify navigation
    cy.get('header').contains('Careers').click();
    cy.get('ul.sub-menu').contains('Send Resume').click({ force: true });
    cy.url().should('include', '/apply-now/#popup1');
  });

  it('should navigate to the Life at PF page when the Life at PF link is clicked', function() {
    // Click the "Life at PF" link and verify URL change
    cy.get('header').contains('Life at PF').click();
    cy.url().should('include', '/life-at-pf');
  });

  it('should navigate to the Expertise page when the Expertise link is clicked', function() {
    // Click the "Expertise" link and verify URL change
    cy.get('header').contains('Expertise').click();
    cy.url().should('include', '/expertise');
  });

  it('should display dropdown options for Resources and verify navigation', function() {
    // Click the "Resources" link and ensure dropdown options are visible
    cy.get('header').contains('Resources').click();
    cy.url().should('include', '/#');

    cy.get('ul.sub-menu').should('be.visible');
    cy.get('ul.sub-menu').contains('Blogs').should('be.visible');
    cy.get('ul.sub-menu').contains('News').should('be.visible');

    // Click "Blogs" and verify navigation
    cy.get('ul.sub-menu').contains('Blogs').click({ force: true });
    cy.url().should('include', '/blogs');

    // Go back and click "News" to verify navigation
    cy.go('back');
    cy.get('header').contains('Resources').click();
    cy.get('ul.sub-menu').contains('News').click({ force: true });
    cy.url().should('include', '/news');
  });

  it('should navigate to the Graduate Gateway Program page when the link is clicked', function() {
    // Click the "Graduate Gateway Program" link and verify URL change
    cy.get('header').contains('Graduate Gateway Program').click();
    cy.url().should('include', '/trainee-program');
  });

  it('should navigate to the Apply Now page when the Apply Now link is clicked', function() {
    // Click the "Apply Now" link and verify URL change
    cy.get('header').contains('Apply Now').click();
    cy.url().should('include', '/apply-now');
  });

  it('should display the Choose Language section and verify presence', () => {
    // Ensure the Choose Language section is visible and correctly rendered
    cy.get('.chooselanguage', { timeout: 10000 })
      .should('exist')
      .and('be.visible');
  });

  it('should have the correct country choice text initially hidden', () => {
    // Check that the "Choose Country" text is present but hidden by default
    cy.get('.choslangtxt', { timeout: 10000 })
      .should('exist')
      .and('not.be.visible');
  });

});
