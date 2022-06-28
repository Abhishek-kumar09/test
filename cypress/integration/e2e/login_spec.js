/// <reference types="cypress" />

const token = "eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5CMVlteHBZem81T1dJNE1XSTBOeTA1TTJaaExUUTBNRE10T0RjMU15MHhOelU1TkRGaFptWmpOV0lpTENKMGVYQWlPaUpLVjFRaWZRLmV5SmhkV1FpT2x0ZExDSmpiR2xsYm5SZmFXUWlPaUp0WlhOb1pYSjVMV05zYjNWa0lpd2laWGgwSWpwN2ZTd2lhV0YwSWpveE5qUXhNRFkwT1RRNUxDSnBjM01pT2lKb2RIUndjem92TDIxbGMyaGxjbmt1YkdGNVpYSTFMbWx2TDJoNVpISmhJaXdpYW5ScElqb2lPVEUyTnpKa05qZ3RNek15TWkwMFptVXhMV0kxWldJdFpUTXpZV1UyT0dNNE1qWTVJaXdpYm1KbUlqb3hOalF4TURZME9UUTVMQ0p6WTNBaU9sc2liM0JsYm1sa0lpd2liMlptYkdsdVpTSmRMQ0p6ZFdJaU9pSlpWMHB2WVZjeGFHRllVWGhQVkVFMVVVZGtkRmxYYkhOTWJVNTJZbEU5UFRwYU1qbDJXako0YkNKOS5qaW9yd2ctSFc4RmJjbnFLRkVPSVdBc2VycThfc1BSd2VxTXlUV1FlTWt5ZTNkcEd6M1RGakJzdmFMWVd0ME1kQUN4dDBhMTZhN1l2UXBHTV9mZ1hMQXoxYnZ6elFzNkVPX0RJVTBOSXM3dTMtam53OTlVdUt2SkZDOGd5YllsWkROdTZjZ0R0YXpMTDU2WkY1Yjh4V2Vpd0lnbWJWTGRkMkNZQ0xsUDlXOVNoTHp2UlNNMGlEcUFDQTRkbXlUWmJXbGpzeHB2Um5iTEFVR3dteGs4bXRJUk5nTEV0dkpXT2o1U01BYjI2RUtLMkh6QzRLMVZhZU50US11QVpCWkd0S2RkaktPMG82VzlsNXAyTTNvWXlqUUFVc3JLYnZBaDVTMXZpR1RGMkNWcXVpenVjWjdTR1lqSzJfWXp1bXdWMkY2NWMtdGxEYkdWMGxYS0locmJYX2dkTldmLVNCcTUyUFBpTHZ1SHh2OVpsTVp3RVlnUE9feENzcTZQVHVUeWlaeW9ickhGT3BSMjF5N2x2OW44Nk1pdklTQ0ZyTnZuRWFjenlmZjE1RFlLZ2REWHdlVThSLVJGYy1Da2xvS1VqZEk0VjZnVEJBZUk3R3ZaWklrRHN0bFJHOFhVZ2Z6ZGdwYWJ0c0JKMmh2N0tPOHdCX29ITUk4RjEyR3pZZU1rcDhGd3hzSkJjenN0d3FsU252X2h5RHRqNjZ1Wlkya0xKeFVHX3VMMWdvTnpWbG1TOFVOWk10MHZ2UDZvbS1yT2pXWmNGMWJNNFZMaUU1OGs0emFGWjhkUy1iT0V3WXRQRXl6NnNqUWNvZzR4eEJOMzZJczlQX1dOZmRnazlWSUJhekpNd08yNG9yYUxqbTJCMUhjTldnU3plRWFWazFBOHJxVVBMRXR2YnNmdyIsImFsZyI6IlJTMjU2IiwicmVmcmVzaF90b2tlbiI6IiIsInRva2VuX3R5cGUiOiJiZWFyZXIifQ"

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
    // const token = Cypress.env('token')
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
  });


})