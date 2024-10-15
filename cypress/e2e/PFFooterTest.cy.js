describe('Programmers Force Website Footer Tests', function () {
    const footerSelector = 'footer'; // Reusable selector for footer

    beforeEach(function () {
        // Prevent test failures due to uncaught exceptions
        cy.on('uncaught:exception', () => false);
        cy.visit('https://pf.com.pk/');
    });

    it('should correctly display and verify About Us section links', function () {
        cy.get(footerSelector).contains('About Us').should('be.visible');

        cy.get(footerSelector).contains('Life At Programmers force').should('be.visible').click({force : true});
        cy.url().should('include', '/life-at-pf');

        cy.get(footerSelector).contains('Our Teammates').should('be.visible').click();
        cy.url().should('include', '/about-us');


        cy.get(footerSelector).contains('In House Privacy Policy').should('be.visible').click();
        cy.url().should('include', '/privacypolicy');


        cy.get(footerSelector).contains('ISO Certified').should('be.visible').click();
        cy.url().should('include', '/iso_certified');

    });

    it('should correctly display and verify Careers section links', function () {
        cy.get(footerSelector).contains('Careers').should('be.visible');
        cy.get(footerSelector).contains('Career').should('be.visible').click();


        cy.get(footerSelector).contains('Job Positions').should('be.visible').click();
        cy.url().should('include', '/apply-now');

        cy.get(footerSelector).contains('Send Resume').should('be.visible').click();
        cy.url().should('include', '/apply-now/#popup1');


        cy.get(footerSelector).contains('Track your Application').should('be.visible').click({ force: true });
        cy.url().should('include', '/apply-now');
    });

    it('should correctly display and verify Blogs section links', function () {
        cy.get(footerSelector).contains('Blogs').should('be.visible');

        cy.get(footerSelector).contains('Ransomware').should('be.visible').click();
        cy.url().should('include', '/ransomware');


        cy.get(footerSelector).contains('FinTech').should('be.visible').click();
        cy.url().should('include', 'fintech');


        cy.get(footerSelector).contains('Life-changing').should('be.visible').click();
        cy.url().should('include', 'life-changing');


        cy.get(footerSelector).contains('AI Career').should('be.visible').click();
        cy.url().should('include', '/ai-career');

    });

    it('should correctly display and verify Contact Us section', function () {
        cy.get(footerSelector).contains('Contact Us').should('be.visible');
        cy.get(footerSelector).contains('hr@pf.com.pk').should('have.attr', 'href', 'mailto:hr@pf.com.pk');
        cy.get(footerSelector).contains('+92 301-588-8444').should('be.visible');

        cy.get(footerSelector).contains('Apply Now').should('be.visible').click();
        cy.url().should('include', '/apply-now');
    });


    it('should correctly display and verify social media links in Follow Us section', function () {
        cy.get(footerSelector).contains('Follow Us').should('be.visible');

        const socialMediaLinks = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'];
        socialMediaLinks.forEach(platform => {
            cy.get(footerSelector).find(`a[href*="${platform}.com"]`).should('be.visible');
        });
    });

    it('should correctly verify the Privacy Policy link', function () {
        cy.get(footerSelector).contains('Privacy Policy').should('be.visible').click();
        cy.url().should('include', '/privacypolicy');
    });
});
