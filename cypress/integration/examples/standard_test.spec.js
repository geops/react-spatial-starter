describe('Canvas', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('canvas should be visible.', () => {
    cy.get('.tm-map')
      .children('.ol-viewport')
      .children('canvas')
      .should('be.visible');
  });
});
