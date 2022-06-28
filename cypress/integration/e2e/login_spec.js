/// <reference types="cypress" />

function altercapabilityFixture(version) { 
  cy.readFile("cypress/fixtures/capabilities.json", (err, data) => {
    if (err) {
        return console.error(err);
    };
  }).then((data) => {
    data["package_version"] = version;
    data["package_url"] = `https://github.com/layer5labs/meshery-extensions-packages/releases/download/${version}/provider-meshery.tar.gz`
    cy.writeFile("cypress/fixtures/capabilities.json", JSON.stringify(data))
  })
}

describe("Login", () => {
  before(()=>{
    const token = Cypress.env('token')
    const releasetag = Cypress.env("releaseTag")
    cy.setCookie("meshery-provider", "Meshery")
    cy.setCookie("token", token)
    window.localStorage.setItem("mode", "designer")
    window.localStorage.setItem("tab", 0)
    altercapabilityFixture(releasetag)
  })

  beforeEach(()=>{
    cy.intercept('GET', '/api/provider/capabilities', {fixture: 'capabilities.json'}).as('getCapabilites')
  })

  it("Visit MeshMap Designer", () => {
    cy.visit("/")
    cy.wait("@getCapabilites")
    cy.get('[data-cy="MeshMap"]').click();
    cy.contains("MeshMap")
    cy.contains("Components")
    cy.contains("Designs")
    cy.contains("Applications")
    cy.contains("Filters")
  });
})