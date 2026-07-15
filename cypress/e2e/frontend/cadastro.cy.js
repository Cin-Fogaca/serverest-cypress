const userFactory = require('../../factories/userFactory')
const usuariosService = require('../../services/usuariosService')
const cadastroPage = require('../../pages/CadastroPage')

describe('Frontend - Cadastro de usuário', () => {
  let usuario

  beforeEach(() => {
    usuario = userFactory.criarUsuario()
    cadastroPage.visitar()
  })

  afterEach(() => {
    // Limpeza: localiza o usuário criado pela UI e remove via API
    usuariosService.login(usuario.email, usuario.password).then((login) => {
      if (login.status === 200) {
        cy.request({
          method: 'GET',
          url: `${Cypress.env('apiUrl')}/usuarios`,
          qs: { email: usuario.email },
        }).then((busca) => {
          const id = busca.body.usuarios[0]._id
          usuariosService.deletarUsuario(id)
        })
      }
    })
  })

  it('Deve cadastrar um novo usuário com sucesso pela interface', () => {
    cadastroPage.cadastrar(usuario)

    cy.url({ timeout: 15000 }).should('include', '/admin/home')
    cy.contains(`Bem Vindo ${usuario.nome}`).should('be.visible')
  })
})