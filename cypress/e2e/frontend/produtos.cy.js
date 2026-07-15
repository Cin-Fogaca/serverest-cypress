const userFactory = require('../../factories/userFactory')
const productFactory = require('../../factories/productFactory')
const usuariosService = require('../../services/usuariosService')
const produtosService = require('../../services/produtosService')
const loginPage = require('../../pages/LoginPage')
const produtosPage = require('../../pages/ProdutosPage')

describe('Frontend - Cadastro de produtos', () => {
  let admin
  let usuarioId
  let token
  let produto

  beforeEach(() => {
    // Preparação de massa via API: admin criado e autenticado antes do teste
    admin = userFactory.criarUsuario()
    produto = productFactory.criarProduto()

    usuariosService.criarUsuario(admin).then((response) => {
      usuarioId = response.body._id

      usuariosService.login(admin.email, admin.password).then((login) => {
        token = login.body.authorization
      })
    })

    loginPage.visitar()
    loginPage.login(admin.email, admin.password)
    cy.url({ timeout: 15000 }).should('include', '/admin/home') // garante sessão estabelecida antes de navegar
  })

  afterEach(() => {
    // Limpeza: remove produto (localizado pelo nome) e usuário via API
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos`,
      qs: { nome: produto.nome },
    }).then((busca) => {
      if (busca.body.quantidade > 0) {
        produtosService.deletarProduto(busca.body.produtos[0]._id, token)
      }
    })

    if (usuarioId) {
      usuariosService.deletarUsuario(usuarioId)
      usuarioId = null
    }
  })

  it('Deve cadastrar um novo produto pela interface e exibi-lo na listagem', () => {
    produtosPage.visitarCadastroDeProdutos()
    produtosPage.cadastrar(produto)

    cy.url().should('include', '/admin/listarprodutos')
    cy.contains('td', produto.nome).should('be.visible')
    cy.contains('td', produto.descricao).should('be.visible')
  })
})
