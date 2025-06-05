import { faker } from '@faker-js/faker'

export function createFakeUser(administrador = true) {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10, memorable: true }),
    administrador: administrador.toString()
  }
}
