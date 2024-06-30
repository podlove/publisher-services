/// <reference types="cypress" />

import { getStartedButton, onboardingBanner } from '../../selectors/banner';
import { step } from '../../selectors/onboarding';
import { activatePublisherButton, deactivatePublisherButton, deactivatePublisherButtonSelector } from '../../selectors/plugins';

describe('Onboarding Banner', () => {
  beforeEach(() => {
    cy.login('admin', 'admin');
    cy.visit('/wp-admin/plugins.php');
    cy.exists(deactivatePublisherButtonSelector).then((exists) => exists && deactivatePublisherButton().click());
  });

  it('shouldn`t show the onboarding banner on a fresh installation', () => {
    cy.visit('/wp-admin');
    onboardingBanner().should('not.exist');
  });

  it('should show the onboarding banner after activationg the publisher', () => {
    cy.visit('/wp-admin/plugins.php');
    activatePublisherButton().click();
    onboardingBanner().should('exist');
  });

  it('should show the onboarding screen on "Get Started" click', () => {
    cy.visit('/wp-admin/plugins.php');
    activatePublisherButton().click();
    onboardingBanner().should('exist');
    getStartedButton().click();
    cy.url().should('contain', 'admin.php?page=podlove_settings_onboarding_handle')
    step('select').should('be.visible');
  });
});
