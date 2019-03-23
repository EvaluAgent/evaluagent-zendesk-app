import I18n from '../../javascripts/lib/i18n'
import { resizeContainer, render } from '../../javascripts/lib/helpers'
import getDefaultTemplate from '../../templates/default'

const MAX_HEIGHT = 1000

class App {
  constructor (client, appData) {
    this._client = client
    this._appData = appData
    this.states = {}
    this.initializePromise = this.init()
  }

  async init () {
    const currentUser = (await this._client.get('currentUser')).currentUser
    this.states.currentUserName = currentUser.name
    this.states.ticketData = await this._client.get('ticket')

    I18n.loadTranslations(currentUser.locale)

    const ticketId = this.states.ticketData.ticket.id
    const settings = this._appData.metadata.settings;

    const EvaluationDataRequest = {
      url: 'https://app.evaluagent.com/api/customer/zendesk/ticket/' + ticketId,
      type: 'GET',
      secure: true,
      headers: {
        "secretToken": settings.secretToken,
        "accessKeyId": settings.accessKeyId
      },
      dataType: 'json'
    }

    const EvaluationDataResponse = await this._client.request(EvaluationDataRequest)

    this.states.evaluation = EvaluationDataResponse

    if (EvaluationDataResponse) {
      render('.loader', getDefaultTemplate(this.states))

      return resizeContainer(this._client, MAX_HEIGHT)
    }
  }

  /**
     * Handle error
     * @param {Object} error error object
     */
  _handleError (error) {
    console.log('An error is handled here: ', error.message)
  }
}

export default App
