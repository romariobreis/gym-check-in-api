import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.js"
import { AuthenticateUseCase } from "../authenticate.js"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.js"

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('Should be able to authenticate a user', async () => {

    await usersRepository.create({
      name: 'Dilton Menezes',
      email: 'dilton.menezes@email.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'dilton.menezes@email.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should be not able to authenticate a user with invalid email', async () => {
    await expect(() => sut.execute({
      email: 'dilton.menezes@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should be not able to authenticate a user with invalid password', async () => {
    await usersRepository.create({
      name: 'Dilton Menezes',
      email: 'dilton.menezes@email.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => sut.execute({
      email: 'dilton.menezes@email.com',
      password: '1234561'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})