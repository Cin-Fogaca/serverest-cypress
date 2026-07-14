const { faker } = require('@faker-js/faker')

const productFactory = {
  criarProduto() {
    return {
      nome: `${faker.commerce.productName()} ${faker.string.alphanumeric(5)}`,
      preco: faker.number.int({ min: 10, max: 500 }),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 }),
    }
  },
}

module.exports = productFactory