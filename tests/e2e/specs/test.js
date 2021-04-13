// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url and sees data', () => {
    cy.visit('/')
    cy.contains('map', 'ciao ')
  })
})

/*
// <reference types="cypress" />
import { mount } from 'cypress-vue-unit-test'
import App from '../../src/App.vue'

describe('App', () => {
  it('Works awesomely', () => {
    mount(App, { propsData: {msg: 'Hello, Cypress!'} })
    // now we can use any Cypress command to interact with the component
    // https://on.cypress.io/api
    cy.contains('h1', 'Hello, Cypress!').should('be.visible')
  })
})
*/