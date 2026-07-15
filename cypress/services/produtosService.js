const produtosService = {
  criarProduto(produto, token) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: { Authorization: token },
      body: produto,
    })
  },

  buscarProdutoPorId(id) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${id}`,
    })
  },

  atualizarProduto(id, produto, token) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('apiUrl')}/produtos/${id}`,
      headers: { Authorization: token },
      body: produto,
    })
  },

  deletarProduto(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/produtos/${id}`,
      headers: { Authorization: token },
    })
  },

  buscarProdutoInexistente(id) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${id}`,
      failOnStatusCode: false,
    })
  },
}

module.exports = produtosService
