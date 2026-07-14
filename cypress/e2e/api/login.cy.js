const userFactory = require('../../factories/userFactory')
const usuariosService = require('../../services/usuariosService')

describe('API - Login', () => {
  let usuario
  let usuarioId

  beforeEach(() => {
    // Preparação de massa: cria um usuário via API para autenticar
    usuario = userFactory.criarUsuario()
    usuariosService.criarUsuario(usuario).then((response) => {
      usuarioId = response.body._id
    })
  })

  afterEach(() => {
    if (usuarioId) {
      usuariosService.deletarUsuario(usuarioId)
      usuarioId = null
    }
  })

  it('Deve autenticar com credenciais válidas e retornar token', () => {
    usuariosService.login(usuario.email, usuario.password).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Login realizado com sucesso')
      expect(response.body.authorization).to.contain('Bearer')
    })
  })

  it('Não deve autenticar com senha inválida', () => {
    usuariosService.login(usuario.email, 'senha-incorreta').then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body.message).to.eq('Email e/ou senha inválidos')
      expect(response.body).to.not.have.property('authorization')
    })
  })
})