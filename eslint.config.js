const pluginCypress = require('eslint-plugin-cypress')
const configPrettier = require('eslint-config-prettier')

module.exports = [
  pluginCypress.configs.recommended,
  configPrettier,
  {
    rules: {
      'no-unused-vars': 'error',
      'cypress/no-unnecessary-waiting': 'error',
    },
  },
]