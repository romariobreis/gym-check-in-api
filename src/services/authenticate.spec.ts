import { describe, expect, it } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.js"
import { AuthenticateService } from "./authenticate-service.js"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js"

describe('Authenticate Service', () => {
  it('Should be able to authenticate a user', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
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
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(inMemoryUsersRepository)

    await expect(() => sut.execute({
      email: 'dilton.menezes@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should be not able to authenticate a user with invalid password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
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