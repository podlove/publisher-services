export const deactivatePublisherButtonSelector = '#deactivate-podlove-podcasting-plugin-for-wordpress';
export const activatePublisherButton = () => cy.get('#activate-podlove-podcasting-plugin-for-wordpress');
export const deactivatePublisherButton = () => cy.get(deactivatePublisherButtonSelector);
export const publisherEntry = () => cy.get('[data-slug="podlove-podcasting-plugin-for-wordpress"]');
