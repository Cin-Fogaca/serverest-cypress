const { faker } = require('@faker-js/faker')

const userFactory = {
  criarUsuario(administrador = 'true') {
    return {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 10 }),
      administrador,
    }
  },
}

module.exports = userFactory
