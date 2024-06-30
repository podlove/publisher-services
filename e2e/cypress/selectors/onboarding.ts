const selector = (name: string) => `[data-test="${name}"]`;

export const step = (step: string) => cy.iframe().find(selector(`step-${step}`)).should('be.visible').click()
