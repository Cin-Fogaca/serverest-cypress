const usuariosService = {
  criarUsuario(usuario) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: usuario,
    })
  },

  buscarUsuarioPorId(id) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
    })
  },

  deletarUsuario(id) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
    })
  },

  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      body: { email, password },
      failOnStatusCode: false,
    })
  },
}

module.exports = usuariosService