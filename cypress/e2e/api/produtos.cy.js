const userFactory = require('../../factories/userFactory')
const productFactory = require('../../factories/productFactory')
const usuariosService = require('../../services/usuariosService')
const produtosService = require('../../services/produtosService')

describe('API - Produtos', () => {
  let token
  let usuarioId
  let produtoId

  beforeEach(() => {
    // Preparação de massa: cria um usuário administrador e autentica
    const admin = userFactory.criarUsuario()

    usuariosService.criarUsuario(admin).then((response) => {
      usuarioId = response.body._id

      usuariosService.login(admin.email, admin.password).then((login) => {
        token = login.body.authorization
      })
    })
  })

  afterEach(() => {
    // Limpeza: remove produto e usuário criados no teste
    if (produtoId) {
      produtosService.deletarProduto(produtoId, token)
      produtoId = null
    }
    if (usuarioId) {
      usuariosService.deletarUsuario(usuarioId)
      usuarioId = null
    }
  })

  it('Deve cadastrar um novo produto com sucesso', () => {
    const produto = productFactory.criarProduto()

    produtosService.criarProduto(produto, token).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      expect(response.body._id).to.not.be.empty

      produtoId = response.body._id
    })
  })

  it('Deve atualizar um produto e persistir as alterações', () => {
    const produto = productFactory.criarProduto()
    const produtoAtualizado = productFactory.criarProduto()

    produtosService.criarProduto(produto, token).then((response) => {
      produtoId = response.body._id

      produtosService
        .atualizarProduto(produtoId, produtoAtualizado, token)
        .then((atualizacao) => {
          expect(atualizacao.status).to.eq(200)
          expect(atualizacao.body.message).to.eq('Registro alterado com sucesso')
        })

      produtosService.buscarProdutoPorId(produtoId).then((busca) => {
        expect(busca.status).to.eq(200)
        expect(busca.body.nome).to.eq(produtoAtualizado.nome)
        expect(busca.body.preco).to.eq(produtoAtualizado.preco)
      })
    })
  })

  it('Deve excluir um produto e garantir que não está mais disponível', () => {
    const produto = productFactory.criarProduto()

    produtosService.criarProduto(produto, token).then((response) => {
      const id = response.body._id

      produtosService.deletarProduto(id, token).then((exclusao) => {
        expect(exclusao.status).to.eq(200)
        expect(exclusao.body.message).to.eq('Registro excluído com sucesso')
      })

      produtosService.buscarProdutoInexistente(id).then((busca) => {
        expect(busca.status).to.eq(400)
        expect(busca.body.message).to.eq('Produto não encontrado')
      })
    })
  })
})