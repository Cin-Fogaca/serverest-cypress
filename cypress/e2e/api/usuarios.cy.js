const userFactory = require('../../factories/userFactory')
const usuariosService = require('../../services/usuariosService')

describe('API - Usuários', () => {
  let usuario
  let usuarioId

  beforeEach(() => {
    usuario = userFactory.criarUsuario()
  })

  afterEach(() => {
    // Limpeza: remove o usuário criado para não acumular massa na aplicação
    if (usuarioId) {
      usuariosService.deletarUsuario(usuarioId)
      usuarioId = null
    }
  })

  it('Deve cadastrar um novo usuário com sucesso', () => {
    usuariosService.criarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      expect(response.body._id).to.not.be.empty

      usuarioId = response.body._id
    })
  })

  it('Deve persistir os dados do usuário cadastrado', () => {
    usuariosService.criarUsuario(usuario).then((response) => {
      usuarioId = response.body._id

      usuariosService.buscarUsuarioPorId(usuarioId).then((busca) => {
        expect(busca.status).to.eq(200)
        expect(busca.body.nome).to.eq(usuario.nome)
        expect(busca.body.email).to.eq(usuario.email)
        expect(busca.body.administrador).to.eq(usuario.administrador)
        expect(busca.body._id).to.eq(usuarioId)
      })
    })
  })
})