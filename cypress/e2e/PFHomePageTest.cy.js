describe('Programmers Force Website Test Suite', () => {

    beforeEach(() => {
        // Ignore uncaught exceptions to prevent test failures
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        // Visit the homepage and wait for the page to load
        cy.visit('https://pf.com.pk/');
        cy.wait(5000);

        // Disable animations for consistent UI testing
        cy.window().then((win) => {
            win.eval(`
                document.querySelectorAll('.aos-init').forEach(el => {
                    el.style.transition = 'none';
                    el.style.opacity = '1';
                });
            `);
        });

        // If the AOS library is initialized, refresh the animations
        cy.window().then((win) => {
            if (win.AOS) {
                win.AOS.refreshHard();
            }
        });
    });

    it('should correctly display the main header and subtext', () => {
        // Assert the main header text is visible
        cy.get('h2.hero_heading_one', { timeout: 20000 })
          .should('exist')
          .and('be.visible')
          .and('contain.text', 'Redefining Technology Through AI');

        // Assert the subtext below the header is visible
        cy.get('p.hero_description', { timeout: 20000 })
          .should('exist')
          .and('be.visible')
          .and('contain.text', 'Providing AI-powered solutions and services to the world’s leading businesses to redefine their objectives with automation and innovation.');
    });

    it('should verify the "Apply Now" button functionality', () => {
        // Ensure "Apply Now" button is visible and has correct link
        cy.contains('a', 'Apply Now', { timeout: 10000 })
          .should('be.visible')
          .and('have.attr', 'href')
          .and('include', '/apply-now');

        // Click the "Apply Now" button and check the URL
        cy.contains('a', 'Apply Now').click();
        cy.url().should('include', '/apply-now');

        // Return to homepage
        cy.go('back');
    });

    it('should confirm visibility of animated header after load', () => {
        // Check if the header becomes visible post-animation
        cy.get('h2.inner-small-heading', { timeout: 20000 })
          .should('have.css', 'opacity', '1')
          .and('be.visible')
          .and('contain.text', 'A Place That Drives Innovation'); // Adjust with actual text
    });

    it('should verify office video presence and functionality', () => {
        // Ensure video is present and visible
        cy.get('video', { timeout: 15000 })
          .should('exist')
          .and('be.visible')
          .and(($video) => {
              expect($video[0].currentSrc).to.not.be.empty;
          });

        // Confirm the video plays correctly
        cy.get('video').then(($video) => {
            $video[0].play();
            cy.wrap($video);
        });
    });

    it('should validate the "About" section header and content', () => {
        // Check "About" subtitle and header
        cy.get('.heading-global', { timeout: 20000 })
          .should('exist')
          .and('be.visible');

        cy.get('.sbtitle', { timeout: 20000 })
          .should('contain.text', 'About');

        cy.get('h2.inner-small-heading', { timeout: 20000 })
          .should('exist')
          .and('be.visible')
          .and('contain.text', 'Programmers Force - Where Innovation Has No Boundaries');
    });

    it('should correctly switch and display tab content', () => {
        // Ensure tabs are visible and clickable
        cy.get('.tab', { timeout: 15000 })
          .should('have.length', 4)
          .and('be.visible');

        // Test tab switching
        cy.get('.tab').each(($tab, index) => {
            cy.wrap($tab).click();
            cy.wrap($tab).should('have.class', 'active');

            // Confirm active tab content is displayed
            cy.get('.tab-content').each(($content, contentIndex) => {
                if (contentIndex === index) {
                    cy.wrap($content).should('have.class', 'active');
                } else {
                    cy.wrap($content).should('not.have.class', 'active');
                }
            });
        });
    });

    it('should auto-scroll through tabs every 2 seconds', () => {
        cy.wait(6000); // Wait for 3 auto-scroll cycles

        // Check that auto-scroll updates the active tab
        cy.get('.tab.active').then(($activeTab) => {
            const initialIndex = $activeTab.index();

            cy.wait(2000).then(() => {
                cy.get('.tab.active').should(($newActiveTab) => {
                    expect($newActiveTab.index()).to.not.equal(initialIndex);
                });
            });
        });
    });




    it('should validate the "Join Us" section titles and images', () => {
        // Verify "Join Us" subtitle and header
        cy.get('span.sbtitle', { timeout: 20000 })
          .should('exist')
          .and('be.visible')
          .and('contain.text', 'Join Us');

        cy.get('h2.inner-heading', { timeout: 20000 })
          .should('exist')
          .and('be.visible')
          .and('contain.text', "Want to Be a Part of Pakistan’s First AI Tech Company?");

        // Validate images in the "Join Us" section
        cy.get('.joinus_row img', { timeout: 10000 }).each(($img) => {
            cy.wrap($img).should('exist').and('have.attr', 'data-src').and('not.be.empty');
            cy.wrap($img).scrollIntoView().should('have.css', 'opacity', '1').and('be.visible');
            cy.wrap($img).should(($imgElement) => {
                expect($imgElement[0].title).to.not.be.empty;
                expect($imgElement[0].alt).to.not.be.empty;
            });
        });
    });

    it('should display the "Apply Now" button with correct attributes', () => {
        cy.get('a.btn_applynow_center', { timeout: 10000 })
          .should('be.visible')
          .and('have.attr', 'href')
          .and('include', '/apply-now').click();


        cy.url().should('include', '/apply-now');
        cy.go('back');
    });
});
