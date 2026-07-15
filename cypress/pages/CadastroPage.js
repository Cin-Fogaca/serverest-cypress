class CadastroPage {
  visitar() {
    cy.visit('/cadastrarusuarios')
  }

  preencherFormulario(usuario) {
    cy.get('[data-testid="nome"]').type(usuario.nome)
    cy.get('[data-testid="email"]').type(usuario.email)
    cy.get('[data-testid="password"]').type(usuario.password, { log: false })

    if (usuario.administrador === 'true') {
      cy.get('[data-testid="checkbox"]').check()
    }
  }

  clicarCadastrar() {
    cy.get('[data-testid="cadastrar"]').click()
  }

  cadastrar(usuario) {
    this.preencherFormulario(usuario)
    this.clicarCadastrar()
  }
}

module.exports = new CadastroPage()
