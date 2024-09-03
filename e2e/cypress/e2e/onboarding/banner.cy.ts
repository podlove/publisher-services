/// <reference types="cypress" />

import { acknowledgeButton } from '../../selectors/acknowledge';
import { getStartedButton, onboardingBanner } from '../../selectors/banner';
import { step } from '../../selectors/onboarding';
import { activatePublisherButton, deactivatePublisherButton, deactivatePublisherButtonSelector, publisherEntry } from '../../selectors/plugins';

describe('Onboarding Banner', () => {
  beforeEach(() => {
    cy.login('admin', 'admin');
    cy.wait(1000);
    cy.visit('/wp-admin/plugins.php');
    cy.clearAllLocalStorage();
    publisherEntry().should('be.visible');
    cy.exists(deactivatePublisherButtonSelector).then((exists) => exists && deactivatePublisherButton().click());
  });

  it('shouldn`t show the onboarding banner on a fresh installation', () => {
    cy.visit('/wp-admin');
    onboardingBanner().should('not.exist');
  });

  it('should show the onboarding banner after activationg the publisher', () => {
    cy.visit('/wp-admin/plugins.php');
    activatePublisherButton().should('be.visible');
    activatePublisherButton().click();
    onboardingBanner().should('exist');
  });

  it('should show the aknowledge screen on "Get Started" click', () => {
    cy.visit('/wp-admin/plugins.php');
    activatePublisherButton().should('be.visible');
    activatePublisherButton().click();
    getStartedButton().click();
    acknowledgeButton().should('be.visible');
  })

  it('should show the onboarding screen on "All right I\'ve got it" click', () => {
    cy.visit('/wp-admin/plugins.php');
    activatePublisherButton().should('be.visible');
    activatePublisherButton().click();
    getStartedButton().click();
    acknowledgeButton().should('be.visible');
    acknowledgeButton().click();
    cy.url().should('contain', 'admin.php?page=podlove_settings_onboarding_handle')
    step('select').should('be.visible');
  });
});
