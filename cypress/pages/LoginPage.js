class LoginPage {
  visitar() {
    cy.visit('/login')
  }

  preencherEmail(email) {
    cy.get('[data-testid="email"]').type(email)
  }

  preencherSenha(senha) {
    cy.get('[data-testid="senha"]').type(senha, { log: false })
  }

  clicarEntrar() {
    cy.get('[data-testid="entrar"]').click()
  }

  login(email, senha) {
    this.preencherEmail(email)
    this.preencherSenha(senha)
    this.clicarEntrar()
  }
}

module.exports = new LoginPage()
