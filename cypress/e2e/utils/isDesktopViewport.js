export const isDesktopViewport = () => {
  return Cypress.config("viewportWidth") >= 600;
};
