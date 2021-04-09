import I18n from '../javascripts/lib/i18n.js'

export default function (args, settings) {

  if (args.evaluation.found !== 1) {
    return `<div class="evaluagent-app">
      <div>
        ${args.evaluation.message}
      </div>
    </div>`
  }

  let responseBody = `<div class="evaluagent-app">
    <div>
        <div class="card">
          <div class="card-header">
            ${I18n.t('evaluation.details')}
          </div>
          <div class="card-body">
            <table class="table">
              <tr>
                <td class="tiny-text bold">${I18n.t('evaluation.evaluator')}</td>
                <td class="tiny-text">${args.evaluation.evaluationData.assignee}</td>
              </tr>
              <tr>
                <td class="tiny-text bold">${I18n.t('evaluation.mode')}</td>
                <td class="tiny-text">${args.evaluation.evaluationData.mode}</td>
              </tr>
              <tr>
                <td class="tiny-text bold">${I18n.t('evaluation.scorecard')}</td>
                <td class="tiny-text">${args.evaluation.evaluationData.scorecard}</td>
              </tr>
              <tr>
                <td class="tiny-text bold">${I18n.t('evaluation.date')}</td>
                <td class="tiny-text">${args.evaluation.evaluationData.date}</td>
              </tr>
            </table>
          </div>
        </div>
        <br/>
        <div class="card">
          <div class="card-header">
            ${I18n.t('evaluation.qualityScore')}
          </div>
          <div class="card-body">
            <h1 class="outcome-title ${args.evaluation.evaluationData.outcome}">${args.evaluation.evaluationData.score}%</h1>
            <p class="tiny-text">${I18n.t('evaluation.qualityScoreText')}</p>
          </div>
        </div>
        <br/>`

  if (args.evaluation.evaluationData.outcome) {
    responseBody += `<div class="card">
      <div class="card-header">
        ${I18n.t('evaluation.evaluationOutcome')}
      </div>
      <div class="card-body">
        <h1 class="outcome-title ${args.evaluation.evaluationData.outcome}">${args.evaluation.evaluationData.outcome}</h1>
        <p class="tiny-text">${I18n.t('evaluation.evaluationOutcomeText')}</p>
      </div>
    </div>
    <br/>`
  }

  if (args.evaluation.evaluationData['auto-fails']) {
    responseBody += `<div class="card">
      <div class="card-header">
        ${I18n.t('evaluation.autoFails')}
      </div>
      <div class="card-body">
        <h1 class="outcome-title">${args.evaluation.evaluationData['auto-fails']}</h1>
        <p class="tiny-text">${I18n.t('evaluation.autoFailsText')}</p>
      </div>
    </div>
    <br/>`
  }

  let returnToEvaluAgentUrl = "https://app.evaluagent.com/quality/evaluations/" + args.evaluation.evaluationData['link-to-evaluagent'] + "/results";

  if (settings.region === 'na') {
    returnToEvaluAgentUrl = "https://app.us-east.evaluagent.com/quality/evaluations/" + args.evaluation.evaluationData['link-to-evaluagent'] + "/results";
  } else if (settings.region === 'aus') {
    returnToEvaluAgentUrl = "https://app.aus.evaluagent.com/quality/evaluations/" + args.evaluation.evaluationData['link-to-evaluagent'] + "/results";
  }

  responseBody += `<a href="${returnToEvaluAgentUrl}" class="btn btn-primary btn-sm" target="_NEW">
    ${I18n.t('evaluation.viewInEvaluagent')}
  </a></div></div>`

  return responseBody;
}
