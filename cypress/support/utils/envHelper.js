export function getApiUrl(path = '') {
  return `${Cypress.env('apiUrl')}${path}`
}