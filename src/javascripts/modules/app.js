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

    let eaUrl = 'https://app.evaluagent.com/api/customer/zendesk/ticket/';

    if (settings.region === 'na') {
      eaUrl = 'https://app.us-east.evaluagent.com/api/customer/zendesk/ticket/';
    } else if (settings.region === 'aus') {
      eaUrl = 'https://app.aus.evaluagent.com/api/customer/zendesk/ticket/';
    }

    const EvaluationDataRequest = {
      url: eaUrl + ticketId,
      type: 'GET',
      headers: {
        "secretToken": settings.secretToken,
        "accessKeyId": settings.accessKeyId
      },
      dataType: 'json'
    }

    const EvaluationDataResponse = await this._client.request(EvaluationDataRequest)

    this.states.evaluation = EvaluationDataResponse

    if (EvaluationDataResponse) {
      render('.loader', getDefaultTemplate(this.states, settings))

      return resizeContainer(this._client, MAX_HEIGHT)
    }
  }

  /**
     * Handle error
     * @param {Object} error error object
     */
  _handleError (error) {
    document.write("An error has occurred: " + error.message);
  }
}

export default App
