const userFactory = require('../../factories/userFactory')
const usuariosService = require('../../services/usuariosService')
const loginPage = require('../../pages/LoginPage')

describe('Frontend - Login', () => {
  let usuario
  let usuarioId

  beforeEach(() => {
    // Preparação de massa via API: usuário já existe antes do teste de tela
    usuario = userFactory.criarUsuario()
    usuariosService.criarUsuario(usuario).then((response) => {
      usuarioId = response.body._id
    })

    loginPage.visitar()
  })

  afterEach(() => {
    if (usuarioId) {
      usuariosService.deletarUsuario(usuarioId)
      usuarioId = null
    }
  })

  it('Deve autenticar com credenciais válidas', () => {
    loginPage.login(usuario.email, usuario.password)

    cy.url().should('include', '/admin/home')
    cy.contains(`Bem Vindo ${usuario.nome}`).should('be.visible')
    cy.get('[data-testid="logout"]').should('be.visible')
  })

  it('Não deve autenticar com senha inválida', () => {
    loginPage.login(usuario.email, 'senha-incorreta')

    cy.contains('Email e/ou senha inválidos').should('be.visible')
    cy.url().should('include', '/login')
  })
})