class ProdutosPage {
  visitarCadastroDeProdutos() {
    cy.visit('/admin/cadastrarprodutos')
  }

  preencherFormulario(produto) {
    cy.get('[data-testid="nome"]').type(produto.nome)
    cy.get('[data-testid="preco"]').type(produto.preco)
    cy.get('[data-testid="descricao"]').type(produto.descricao)
    cy.get('[data-testid="quantity"]').type(produto.quantidade)
  }

  clicarCadastrar() {
    cy.get('[data-testid="cadastarProdutos"]').click()
  }

  cadastrar(produto) {
    this.preencherFormulario(produto)
    this.clicarCadastrar()
  }
}

module.exports = new ProdutosPage()