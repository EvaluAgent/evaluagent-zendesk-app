/* eslint-env jest, browser */
import App from '../src/javascripts/modules/app'
import { CLIENT } from './mocks/mock'
import createRangePolyfill from './polyfills/createRange'

jest.mock('../src/javascripts/lib/i18n', () => {
  return {
    loadTranslations: jest.fn(),
    t: key => key
  }
})

if (!document.createRange) {
  createRangePolyfill()
}

describe('EvaluAgent App', () => {
  let app

  describe('Initialization Success', () => {
    beforeEach((done) => {
      document.body.innerHTML = '<section data-main><img class="loader" src="spinner.gif"/></section>'
      CLIENT.invoke = jest.fn().mockReturnValue(Promise.resolve({}))

      app = new App(CLIENT, {})

      app.initializePromise.then(() => {
        done()
      })
    })


  })
})
