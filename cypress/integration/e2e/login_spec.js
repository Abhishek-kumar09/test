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
    const releasetag = Cypress.env("releasetag")
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
    cy.wait(3000)
    cy.contains("MeshMap")
    cy.contains("Components")
    cy.contains("Designs")
    cy.contains("Applications")
    cy.contains("Filters")
  });

  it("Visit MeshMap Designer", () => {
    cy.visit("/")
    cy.wait("@getCapabilites")
    cy.get('[data-cy="MeshMap"]').click();
    cy.wait(5000)
    cy.contains("MeshMap")
    cy.contains("Components")
    cy.contains("Designs")
    cy.contains("Applications")
    cy.contains("Filters")
  });
})


describe("Check API behaviour", () => {
  beforeEach(()=>{
    const token = Cypress.env('token')
    const releasetag = Cypress.env("releasetag")
    cy.setCookie("meshery-provider", "Meshery")
    cy.setCookie("token", token)
    window.localStorage.setItem("mode", "designer")
    window.localStorage.setItem("tab", 0)
    altercapabilityFixture(releasetag)
  })

  it("check resonse", () => {
    cy.request("/api/provider/extension/").as("api")
    cy.get("@api").then(res => {
      console.log("res here", res)
    })
  })

  it("check resonse2", () => {
    cy.request("/api/provider/extension/").as("api")
    cy.get("@api").then(res => {
      console.log("res here", res)
    })
  })

  it("check resonse3", () => {
    cy.request("/api/provider/extension/provider/navigator/meshmap/index.js").as("api")
    cy.get("@api").then(res => {
      console.log("res here", res)
    })
  })

  it("check resonse3", () => {
    cy.request("/api/provider/extension/provider/navigator/").as("api")
    cy.get("@api").then(res => {
      console.log("res here", res)
    })
  })
})